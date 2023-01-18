import { Kafka, Producer, Consumer, RecordMetadata } from 'kafkajs';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  KafkaMessagePayload,
  KafkaOptions,
} from './kafka.types';
import { KafkaResponseDeserializer } from './kafka-response.deserializer';

export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private readonly producer: Producer;
  private readonly consumer: Consumer;
  private deserializer: KafkaResponseDeserializer;

  constructor(options: KafkaOptions) {
    const { kafkaConfig, producerConfig, consumerConfig } = options;

    this.kafka = new Kafka(kafkaConfig);
    this.producer = this.kafka.producer(producerConfig);
    if (consumerConfig) {
      this.consumer = this.kafka.consumer(consumerConfig);
    }

    this.deserializer = new KafkaResponseDeserializer();
  }

  async onModuleInit(): Promise<void> {
    await this.kafka?.admin()?.connect();
    await this.producer?.connect();
    await this.consumer?.connect();
    console.log('Connected to Kafka');
  }

  async onModuleDestroy(): Promise<void> {
    await this.consumer?.disconnect();
    await this.producer?.disconnect();
    await this.kafka?.admin().disconnect();
  }

  async send(
    kafkaMessagePayload: KafkaMessagePayload,
  ): Promise<RecordMetadata[]> {
    if (!this.producer) {
      throw new Error('There is no producer, unable to send message.');
    }

    return this.producer.send({
      topic: kafkaMessagePayload.topic,
      messages: kafkaMessagePayload.messages,
    });
  }

  async subscribe(
    topic: string,
    callback: (KafkaResponse) => void,
  ): Promise<void> {
    if (!this.consumer) {
      throw new Error('There is no consumer, unable to receive messages.');
    }

    await this.consumer.subscribe({
      topic,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const response = this.deserializer.deserialize(message);

          callback(response);
        } catch (e) {
          console.log(`Error for message ${topic}: ${e}`);

          throw e;
        }
      },
    });
  }
}
