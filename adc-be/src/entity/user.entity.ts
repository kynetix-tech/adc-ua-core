import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PostEntity } from './post.entity';

export enum Role {
  User = 'User',
  PostEditor = 'PostEditor',
}

@Entity('user_adc')
export class UserEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'auth0_id',
    unique: true,
  })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
