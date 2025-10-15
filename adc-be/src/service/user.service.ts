import { HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationError } from '../common/aplication.error';
import { UserRegisterRequest } from '../dto/request.dto';
import { UserModel } from '../model/user.model';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async upsertUser(
    user: UserRegisterRequest,
    auth0Id: string,
  ): Promise<UserModel> {
    const existingUser = await this.userRepository.getByAuth0Id(auth0Id);
    if (existingUser) {
      return existingUser;
    }

    const userModel = new UserModel(
      auth0Id,
      user.email,
      user.firstName,
      user.lastName,
      user.gender,
    );

    const id = await this.userRepository.register(userModel);
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
export class PostPermissionDenied extends ApplicationError {}
