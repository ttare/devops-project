import { KafkaMessage } from 'kafkajs';
import {Deserializer} from "@nestjs/microservices";
import { KafkaResponse } from './kafka.types';

export class KafkaResponseDeserializer
  implements Deserializer<any, KafkaResponse>
{
  deserialize(message: KafkaMessage): KafkaResponse {
    const { key, value, timestamp, offset } = message;
    let id: string;
    if (Buffer.isBuffer(key)) {
      id = Buffer.from(key).toString();
    } else {
      id = key;
    }

    const string = Buffer.isBuffer(value)
      ? Buffer.from(value).toString()
      : value;
    const json = JSON.parse(string);

    return {
      key: id,
      response: json,
      timestamp,
      offset: Number(offset),
    };
  }
}
