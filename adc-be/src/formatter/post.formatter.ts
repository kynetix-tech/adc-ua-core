import { Injectable } from '@nestjs/common';
import { PostViewModel } from '../model/post.model';
import {
  ImageUploadResponse,
  PostCreationResponse,
  PostResponse,
} from '../dto/responce.dto';
import { CarSpecificationFormatter } from './car-specification.formatter';
import { UserFormatter } from './user.formatter';

@Injectable()
export class PostFormatter {
  constructor(
    private readonly carSpecificationFormatter: CarSpecificationFormatter,
    private readonly userFormatter: UserFormatter,
  ) {}

  public toPostResponse(post: PostViewModel): PostResponse {
    return {
      title: post.title,
      content: post.content,
      carYear: post.carYear,
      carMake: this.carSpecificationFormatter.toCarMakeResponse(post.carMake),
      carModel: this.carSpecificationFormatter.toCarModelResponse(
        post.carModel,
      ),
      user: this.userFormatter.toUserResponse(post.user),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes: post.likes,
      id: post.id,
    };
  }

  public toPostsResponse(posts: PostViewModel[]): Array<PostResponse> {
    return posts.map(this.toPostResponse.bind(this));
  }

  public toPostCreationResponse(postId: number): PostCreationResponse {
    return { postId };
  }

  public toImageUploadResponse(filename: string): ImageUploadResponse {
    return { filename };
  }
}
