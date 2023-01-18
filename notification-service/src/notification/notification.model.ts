import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NotificationStatusTypes } from './notification-status.types';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pkey_notification_id' })
  id: number;

  @Column({ type: 'varchar', default: 'email' })
  provider: string = 'email';

  @Column()
  type: string;

  @Column({ nullable: false })
  userId: number;

  @Column()
  status: NotificationStatusTypes;

  @Column({ nullable: true })
  info?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
