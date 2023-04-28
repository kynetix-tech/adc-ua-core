import { HttpStatus, Injectable } from '@nestjs/common';
import { LikeRepository } from '../repository/like.repository';
import { LikeRequest } from '../dto/request.dto';
import { LikeModel } from '../model/like.model';
import { ApplicationError } from '../common/aplication.error';

@Injectable()
export class LikeCommentManagingService {
  constructor(private readonly likeRepository: LikeRepository) {}

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
}

export class LikeAlreadyExists extends ApplicationError {}
export class PostDoesNotExists extends ApplicationError {}
