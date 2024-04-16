import { Gender, Role } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  auth0Id: string;

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
  postId: string;

  @ApiProperty()
  id: string;
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
  id: string;
}

export class PostCreateUpdateResponse {
  @ApiProperty()
  postId: string;
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
