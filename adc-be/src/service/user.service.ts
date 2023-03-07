import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../model/user.model';

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
}
