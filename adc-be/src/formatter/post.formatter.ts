import { Injectable } from '@nestjs/common';
import {
  ImageUploadResponse,
  PostCreateUpdateResponse,
  PostResponse,
} from '../dto/responce.dto';
import { PostViewModel } from '../model/post.model';
import { CarSpecificationFormatter } from './car-specification.formatter';
import { LikeCommentManagingFormatter } from './like-comment-managing.formatter';
import { UserFormatter } from './user.formatter';

@Injectable()
export class PostFormatter {
  constructor(
    private readonly carSpecificationFormatter: CarSpecificationFormatter,
    private readonly userFormatter: UserFormatter,
    private readonly likeCommentManagingFormatter: LikeCommentManagingFormatter,
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
      likes: post.likes.map(this.likeCommentManagingFormatter.toLikeResponse),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      id: post.id,
    };
  }

  public toPostsResponse(posts: PostViewModel[]): Array<PostResponse> {
    return posts.map(this.toPostResponse.bind(this));
  }

  public toPostCreateUpdateResponse(postId: number): PostCreateUpdateResponse {
    return { postId };
  }

  public toImageUploadResponse(filename: string): ImageUploadResponse {
    return { filename };
  }
}
