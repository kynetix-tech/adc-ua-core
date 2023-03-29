import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { CarMakeEntity } from './car-make.entity';
import { CarModelEntity } from './car-model.entity';

export interface ContentItem {
  id: number;
  type: 'text' | 'img';
  content: string;
}

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 400,
  })
  title: string;

  @Column({
    type: 'json',
    array: true,
    nullable: true,
  })
  content: Array<ContentItem>;

  @Column({
    type: 'integer',
    default: 0,
  })
  likes: number;

  @Column({
    type: 'integer',
  })
  carYear: number;

  @ManyToOne(() => CarMakeEntity)
  @JoinColumn({ name: 'car_make_id' })
  carMake: CarMakeEntity;

  @ManyToOne(() => CarModelEntity)
  @JoinColumn({ name: 'car_model_id' })
  carModel: CarModelEntity;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
