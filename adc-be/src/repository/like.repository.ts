import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { LikeEntity } from '../entity/like.entity';
import { LikeModel } from '../model/like.model';

@Injectable()
export class LikeRepository {
  private repository: Repository<LikeEntity>;

  constructor(private manager: EntityManager) {
    this.repository = this.manager.getRepository(LikeEntity);
  }

  public static toLikeModel(likeEntity: LikeEntity): LikeModel {
    return new LikeModel(likeEntity.userId, likeEntity.postId, likeEntity.id);
  }

  public static toLikeModelBySpread(
    userId: string,
    postId: number,
    id: number,
  ) {
    return new LikeModel(userId, postId, id);
  }

  public async addLike(like: LikeModel): Promise<LikeModel> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .insert()
      .into(LikeEntity)
      .values({
        userId: like.userId,
        postId: like.postId,
      })
      .execute();

    return LikeRepository.toLikeModelBySpread(
      like.userId,
      like.postId,
      raw[0].id,
    );
  }

  public async deleteLike(like: LikeModel): Promise<void> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .delete()
      .from(LikeEntity)
      .where('post_id = :postId', { postId: like.postId })
      .andWhere('user_id = :userId', { userId: like.userId })
      .returning('id')
      .execute();
  }

  public async getLikeByUserAndPost(
    userId: string,
    postId: number,
  ): Promise<LikeModel> {
    const likeEntity = await this.repository
      .createQueryBuilder()
      .select()
      .where('post_id = :postId', { postId: postId })
      .andWhere('user_id = :userId', { userId: userId })
      .getOne();

    if (likeEntity) {
      return LikeRepository.toLikeModel(likeEntity);
    }
  }
}
