import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity('like')
@Unique(['postId', 'userId'])
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'post_id',
  })
  postId: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
