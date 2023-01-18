import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaService } from '@app/shared/dist/modules/kafka';
import { UserCreateDto } from '@app/shared/dist/dtos';
import { ConfigService } from '../../config/config.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('kafka') private kafkaService: KafkaService,
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async exists(email: string): Promise<boolean> {
    if (!email) {
      throw new Error('Invalid email address');
    }

    const user = await this.userRepository.findOneBy({ email });
    return Boolean(user);
  }

  async create(userCreateDto: UserCreateDto): Promise<UserCreateDto> {
    const user = new User();
    user.firstName = userCreateDto.firstName;
    user.lastName = userCreateDto.lastName;
    user.email = userCreateDto.email;
    console.log('@', user);
    const created = await this.userRepository.save(user);
    console.log('created@', created);

    const topic = this.configService.get().KAFKA_TOPIC_USER_CREATED;
    await this.kafkaService.send({
      topic,
      messages: [
        {
          key: Math.random().toString(),
          value: JSON.stringify({
            userId: created.id,
            email: created.email,
          }),
        },
      ],
    });
    userCreateDto.password = undefined;
    return userCreateDto;
  }

  async get(email: string): Promise<User> {
    if (!email) {
      throw new Error('Invalid email address');
    }
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
