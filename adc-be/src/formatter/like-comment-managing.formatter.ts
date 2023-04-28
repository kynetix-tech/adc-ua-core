import { Injectable } from '@nestjs/common';
import { LikeModel } from '../model/like.model';
import { LikeResponse } from '../dto/responce.dto';

@Injectable()
export class LikeCommentManagingFormatter {
  public toLikeResponse(like: LikeModel): LikeResponse {
    return {
      userId: like.userId,
      postId: like.postId,
      id: like.id,
    };
  }
}
