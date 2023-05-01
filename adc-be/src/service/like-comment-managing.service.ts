import { HttpStatus, Injectable } from '@nestjs/common';
import { LikeRepository } from '../repository/like.repository';
import {
  CommentGetCreateRequest,
  CommentDeleteRequest,
  LikeRequest,
} from '../dto/request.dto';
import { LikeModel } from '../model/like.model';
import { ApplicationError } from '../common/aplication.error';
import { CommentRepository } from '../repository/comment.repository';
import { CommentCreateModel } from '../model/comment.model';

@Injectable()
export class LikeCommentManagingService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  public async addLike(
    newLike: LikeRequest,
    userId: string,
  ): Promise<LikeModel> {
    const existingLike = await this.likeRepository.getLikeByUserAndPost(
      userId,
      newLike.postId,
    );

    if (existingLike) {
      throw new LikeAlreadyExists('Like already exists', HttpStatus.CONFLICT);
    }

    try {
      return await this.likeRepository.addLike(
        new LikeModel(userId, newLike.postId),
      );
    } catch (error) {
      throw new PostDoesNotExists('Post does not exists');
    }
  }

  public async deleteLike(like: LikeRequest, userId: string): Promise<void> {
    return await this.likeRepository.deleteLike(
      new LikeModel(userId, like.postId),
    );
  }

  public async createComment(
    comment: CommentGetCreateRequest,
    userId: string,
  ): Promise<number> {
    try {
      return await this.commentRepository.createComment(
        new CommentCreateModel(comment.text, comment.postId, userId),
      );
    } catch (e) {
      console.log(e);
      throw new PostDoesNotExists('Post does not exists');
    }
  }

  public async deleteComment(comment: CommentDeleteRequest): Promise<void> {
    return this.commentRepository.deleteComment(comment.commentId);
  }

  public async getNewestCommentsWithLimit(
    postId: number,
    limit: number,
    offset: number,
  ) {
    return this.commentRepository.getNewestCommentsForPost(
      postId,
      limit,
      offset,
    );
  }
}

export class LikeAlreadyExists extends ApplicationError {}
export class PostDoesNotExists extends ApplicationError {}
