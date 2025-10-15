import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarMakeEntity } from './car-make.entity';
import { CarModelEntity } from './car-model.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';
import { UserEntity } from './user.entity';

export interface ContentItem {
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
    default: () => `'[]'`,
    nullable: true,
  })
  content: Array<ContentItem>;

  @Column({
    type: 'integer',
    nullable: true,
  })
  carYear: number;

  @Column({
    type: 'string',
    name: 'user_id',
  })
  userId: string;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'car_make_id',
  })
  carMakeId: number;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'car_model_id',
  })
  carModelId: number;

  @ManyToOne(() => CarMakeEntity)
  @JoinColumn({ name: 'car_make_id' })
  carMake: CarMakeEntity;

  @ManyToOne(() => CarModelEntity)
  @JoinColumn({ name: 'car_model_id' })
  carModel: CarModelEntity;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity[];
}
