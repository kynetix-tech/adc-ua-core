import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikeModel } from '../model/like.model';
import { Like, LikeDocument } from '../schema/like.schema';

@Injectable()
export class LikeRepository {
  @InjectModel(Like.name) private model: Model<LikeDocument>;

  public static toLikeModel(likeEntity: LikeDocument): LikeModel {
    return new LikeModel(likeEntity.user, likeEntity.post, likeEntity.id);
  }

  public static toLikeModelBySpread(
    userId: string,
    postId: string,
    id: string,
  ) {
    return new LikeModel(userId, postId, id);
  }

  public async addLike(like: LikeModel): Promise<LikeModel> {
    console.log({
      _id: like.id,
      user: like.userId,
      post: like.postId,
    });
    const doc = await this.model.create({
      _id: like.id,
      user: like.userId,
      post: like.postId,
    });

    return LikeRepository.toLikeModelBySpread(doc.user, doc.post, doc._id);
  }

  public async deleteLike(like: LikeModel): Promise<void> {
    await this.model.deleteOne({ id: like.id });
  }

  public async getLikeByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeModel> {
    const likeDoc = await this.model
      .findOne({ user: userId, post: postId })
      .populate(['user', 'post']);

    if (likeDoc) {
      return LikeRepository.toLikeModel(likeDoc);
    }
  }

  public async getLikeByPost(postId: string): Promise<Array<LikeModel>> {
    const likeDocs = await this.model.find({ post: postId });

    return likeDocs.map((likeDoc) => LikeRepository.toLikeModel(likeDoc));
  }
}
