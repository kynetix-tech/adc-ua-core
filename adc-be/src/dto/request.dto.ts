import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entity/user.entity';
import { ContentItem } from './responce.dto';
import { v4 as uuidv4 } from 'uuid';

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

  @ApiProperty({ required: false, type: String })
  id?: string;
}

export class LikeRequest {
  @ApiProperty()
  postId: string;
}

export class CommentGetCreateRequest {
  @ApiProperty()
  text: string;

  @ApiProperty()
  postId: string;
}

export class CommentDeleteRequest {
  @ApiProperty()
  commentId: number;
}
