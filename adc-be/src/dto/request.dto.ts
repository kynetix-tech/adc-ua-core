import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
