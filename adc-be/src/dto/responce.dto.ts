import { Gender, Role } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  role: Role;
}

export class CarMakeResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
