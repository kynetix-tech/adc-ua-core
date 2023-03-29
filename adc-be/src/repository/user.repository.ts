import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserModel } from '../model/user.model';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private manager: EntityManager) {}

  public static toUserModel(userEntity?: UserEntity): UserModel {
    return new UserModel(
      userEntity.id,
      userEntity.email,
      userEntity.firstName,
      userEntity.lastName,
      userEntity.gender,
      userEntity.role,
    );
  }

  public async getByAuth0Id(auth0Id: string): Promise<UserModel> {
    const userEntity = await this.manager
      .getRepository(UserEntity)
      .createQueryBuilder()
      .where('auth0_id = :auth0Id', { auth0Id })
      .getOne();

    if (userEntity) return UserRepository.toUserModel(userEntity);
  }

  public async register(user: UserModel): Promise<string> {
    const { raw } = await this.manager
      .getRepository(UserEntity)
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        role: user.role,
      })
      .returning(['id'])
      .execute();

    return raw[0].auth0_id;
  }
}
