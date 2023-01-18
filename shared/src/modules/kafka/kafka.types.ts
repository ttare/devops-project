import {
  KafkaConfig,
  ConsumerConfig,
  ProducerConfig,
  ProducerRecord,
  Message,
} from 'kafkajs';

export { EachMessagePayload, EachMessageHandler } from 'kafkajs';

export interface KafkaOptions {
  name: string;
  kafkaConfig: KafkaConfig;
  consumerConfig?: ConsumerConfig;
  producerConfig?: ProducerConfig;
}

export interface KafkaMessageObject extends Message {
  value: any | Buffer | string | null;
  key?: any;
}

export interface KafkaMessagePayload extends Omit<ProducerRecord, 'topic'> {
  messages: KafkaMessageObject[];
  topic?: string;
}

export interface KafkaRequest<T = unknown> {
  key: Buffer | string | null;
  value: T;
  topic: string;
  headers: Record<string, any>;
}

export interface KafkaResponse<T = unknown> {
  response: T;
  key: string;
  timestamp: string;
  offset: number;
}
