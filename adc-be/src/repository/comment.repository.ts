import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CommentCreateModel, CommentViewModel } from '../model/comment.model';
import { UserRepository } from './user.repository';
import { Post } from '../schema/post.schema';
import { CommentDocument } from '../schema/comment.schema';

@Injectable()
export class CommentRepository {
  @InjectModel(Post.name) private model: Model<CommentDocument>;

  public static toCommentViewModel(comment: CommentDocument): CommentViewModel {
    return new CommentViewModel(
      comment.text,
      comment.post._id,
      comment.createdAt,
      UserRepository.toUserModel(comment.user),
      comment.id,
    );
  }

  public static toCommentCreateModel(
    commentEntity: CommentDocument,
  ): CommentCreateModel {
    return new CommentCreateModel(
      commentEntity.text,
      commentEntity.post._id,
      commentEntity.user._id,
    );
  }

  public async getNewestCommentsForPost(
    postId: string,
    limit: number,
    offset: number,
  ): Promise<CommentViewModel[]> {
    const commentDocs = await this.model
      .find({ post: postId })
      .sort('id')
      .populate(['post', 'user'])
      .limit(limit)
      .skip(offset);

    return commentDocs.map(CommentRepository.toCommentViewModel);
  }

  public async createComment(
    commentModel: CommentCreateModel,
  ): Promise<number> {
    const doc = await this.model.create({
      text: commentModel.text,
      post: commentModel.postId,
      user: commentModel.userId,
    });

    return doc.id;
  }

  public async deleteComment(commentId: number): Promise<void> {
    await this.model.deleteOne({ id: commentId });
  }

  public async getCommentById(commentId: number): Promise<CommentCreateModel> {
    const commentDoc = await this.model
      .findOne({ id: commentId })
      .populate(['post', 'user']);

    if (commentDoc) {
      return CommentRepository.toCommentCreateModel(commentDoc);
    }
  }
}
