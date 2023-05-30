import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';
import { CommentCreateModel, CommentViewModel } from '../model/comment.model';
import { UserRepository } from './user.repository';

@Injectable()
export class CommentRepository {
  private repository: Repository<CommentEntity>;

  constructor(private manager: EntityManager) {
    this.repository = this.manager.getRepository(CommentEntity);
  }

  public static toCommentViewModel(
    commentEntity: CommentEntity,
  ): CommentViewModel {
    return new CommentViewModel(
      commentEntity.text,
      commentEntity.postId,
      commentEntity.createdAt,
      UserRepository.toUserModel(commentEntity.user),
      commentEntity.id,
    );
  }

  public static toCommentCreateModel(
    commentEntity: CommentEntity,
  ): CommentCreateModel {
    return new CommentCreateModel(
      commentEntity.text,
      commentEntity.postId,
      commentEntity.userId,
    );
  }

  public async getNewestCommentsForPost(
    postId: number,
    limit: number,
    offset: number,
  ): Promise<CommentViewModel[]> {
    const commentEntity = await this.repository
      .createQueryBuilder('comment')
      .offset(offset)
      .where('post_id = :postId', { postId })
      .limit(limit)
      .leftJoinAndSelect('comment.user', 'user')
      .orderBy('comment.id', 'DESC')
      .getMany();

    return commentEntity.map(CommentRepository.toCommentViewModel);
  }

  public async createComment(
    commentModel: CommentCreateModel,
  ): Promise<number> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .insert()
      .into(CommentEntity)
      .values({
        text: commentModel.text,
        postId: commentModel.postId,
        userId: commentModel.userId,
      })
      .execute();

    return raw[0].id;
  }

  public async deleteComment(commentId: number): Promise<void> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .delete()
      .from(CommentEntity)
      .where('id = :commentId', { commentId })
      .execute();
  }

  public async getCommentById(commentId: number): Promise<CommentCreateModel> {
    const commentEntity = await this.repository
      .createQueryBuilder()
      .where('id = :commentId', { commentId })
      .getOne();

    if (commentEntity) {
      return CommentRepository.toCommentCreateModel(commentEntity);
    }
  }
}
