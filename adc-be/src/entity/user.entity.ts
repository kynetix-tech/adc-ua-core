import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { LikeEntity } from './like.entity';

export enum Role {
  User = 'User',
  PostEditor = 'PostEditor',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
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
    name: 'first_name',
    length: 100,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 100,
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];
}
