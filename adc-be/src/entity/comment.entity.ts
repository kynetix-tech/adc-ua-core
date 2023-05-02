import {
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
  })
  text: string;

  @Column({
    name: 'post_id',
  })
  postId: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
