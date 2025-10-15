import { Injectable } from '@nestjs/common';
import {
  CommentCreateResponse,
  CommentViewResponse,
  LikeResponse,
} from '../dto/responce.dto';
import { CommentViewModel } from '../model/comment.model';
import { LikeModel } from '../model/like.model';
import { UserFormatter } from './user.formatter';

@Injectable()
export class LikeCommentManagingFormatter {
  constructor(private readonly userFormatter: UserFormatter) {}

  public toLikeResponse(like: LikeModel): LikeResponse {
    return {
      userId: like.userId,
      postId: like.postId,
      id: like.id,
    };
  }

  public toCommentCreateResponce(commentId: number): CommentCreateResponse {
    return {
      commentId,
    };
  }

  public toCommentViewResponse(
    commentViewModel: CommentViewModel,
  ): CommentViewResponse {
    return {
      id: commentViewModel.id,
      text: commentViewModel.text,
      postId: commentViewModel.postId,
      createdAt: commentViewModel.createdAt,
      user: this.userFormatter.toUserResponse(commentViewModel.user),
    };
  }

  public toCommentsViewResponse(
    commentsViewModels: CommentViewModel[],
  ): CommentViewResponse[] {
    return commentsViewModels.map(this.toCommentViewResponse.bind(this));
  }
}
