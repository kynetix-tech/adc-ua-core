import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../model/user.model';
import { ApplicationError } from '../shared/aplication.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async upsertUser(user: UserModel): Promise<UserModel> {
    const existingUser = await this.userRepository.getByAuth0Id(user.id);
    if (existingUser) {
      return existingUser;
    }

    const id = await this.userRepository.register(user);
    return await this.userRepository.getByAuth0Id(id);
  }

  public async getById(userId: string): Promise<UserModel> {
    const user = await this.userRepository.getByAuth0Id(userId);

    if (!user) {
      throw new UserNotExistsError(
        `User with id: ${userId} not exists in server db`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}

export class UserNotExistsError extends ApplicationError {}
