import { Gender, Role } from '../entity/user.entity';

export class UserModel {
  constructor(
    public readonly id: string,
    public readonly auth0Id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly gender: Gender,
    public readonly role: Role = Role.User,
  ) {}
}
