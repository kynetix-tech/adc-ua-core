import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('checksum')
export class ChecksumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'checksum',
  })
  checkSum: string;

  @Column({
    type: 'varchar',
    name: 'filename',
  })
  fileName: string;

  @Column({
    type: 'string',
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
