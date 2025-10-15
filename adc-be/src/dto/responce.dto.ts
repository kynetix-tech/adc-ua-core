import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role } from '../entity/user.entity';

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

export class CarModelResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}

export class ContentItem {
  @ApiProperty()
  type: 'text' | 'img';

  @ApiProperty()
  content: string;
}

export class LikeResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  id: number;
}

export class PostResponse {
  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true, type: ContentItem })
  content: Array<ContentItem>;

  @ApiProperty()
  carYear: number;

  @ApiProperty()
  carMake: CarMakeResponse;

  @ApiProperty()
  carModel: CarModelResponse;

  @ApiProperty()
  user: UserResponse;

  @ApiProperty({ isArray: true, type: LikeResponse })
  likes: Array<LikeResponse>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  id: number;
}

export class PostCreateUpdateResponse {
  @ApiProperty()
  postId: number;
}

export class ImageUploadResponse {
  @ApiProperty()
  filename: string;
}

export class CommentCreateResponse {
  @ApiProperty()
  commentId: number;
}

export class CommentViewResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  user: UserResponse;
}
