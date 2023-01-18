import { DynamicModule, Global, Module } from '@nestjs/common';
import { KafkaOptions } from './kafka.types';
import { KafkaService } from './kafka.service';
import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';

@Global()
@Module({})
export class KafkaModule {
  static register(options: KafkaOptions[]): DynamicModule {
    const clients: ValueProvider[] = options.map((kafkaOptions) => {
      return {
        provide: kafkaOptions.name,
        useValue: new KafkaService(kafkaOptions),
      };
    });

    return {
      exports: clients,
      module: KafkaModule,
      providers: clients,
    };
  }
}
