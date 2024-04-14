import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../model/user.model';
import { ApplicationError } from '../common/aplication.error';
import { UserRegisterRequest } from '../dto/request.dto';

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
      uuidv4(),
      auth0Id,
      user.email,
      user.firstName,
      user.lastName,
      user.gender,
    );

    const id = await this.userRepository.register(userModel);
    return await this.userRepository.getByAuth0Id(id);
  }

  public async getByAuth0Id(auth0Id: string): Promise<UserModel> {
    const user = await this.userRepository.getByAuth0Id(auth0Id);

    if (!user) {
      throw new UserNotExistsError(
        `User with id: ${auth0Id} not exists in server db`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}

export class UserNotExistsError extends ApplicationError {}
