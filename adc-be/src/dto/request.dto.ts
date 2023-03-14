import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entity/user.entity';

export class UserRegisterRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: Gender;
}
