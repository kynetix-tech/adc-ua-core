import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entity/user.entity';
import { ContentItem } from './responce.dto';

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

export class PostCreateUpdateRequest {
  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true, type: ContentItem })
  content: Array<ContentItem>;

  @ApiProperty()
  carYear: number;

  @ApiProperty()
  carMakeId: number;

  @ApiProperty()
  carModelId: number;

  @ApiProperty({ required: false, type: Number })
  id = 0;
}
