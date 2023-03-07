import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { UserResponse } from '../dto/responce.dto';

@Injectable()
export class UserFormatter {
  public toUserResponse(user: UserModel): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
