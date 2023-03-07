import { Role } from '../entity/user.entity';

export class UserModel {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: Role = Role.User,
  ) {}
}
