import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { PostCreateUpdateModel, PostViewModel } from '../model/post.model';
import { CarMakeRepository } from './car-make.repository';
import { CarModelRepository } from './car-model.repository';
import { UserRepository } from './user.repository';
import { LikeRepository } from './like.repository';

@Injectable()
export class PostRepository {
  private repository: Repository<PostEntity>;

  constructor(private manager: EntityManager) {
    this.repository = this.manager.getRepository(PostEntity);
  }

  public static toPostModel(post: PostEntity): PostViewModel {
    return new PostViewModel(
      post.title,
      post.content,
      post.carYear,
      CarMakeRepository.toCarMakeModel(post.carMake),
      CarModelRepository.toCarModelModel(post.carModel),
      UserRepository.toUserModel(post.user),
      post.likes.map(LikeRepository.toLikeModel),
      post.createdAt,
      post.updatedAt,
      post.id,
    );
  }

  public async getByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<PostViewModel[]> {
    const postEntity = await this.repository
      .createQueryBuilder('post')
      .offset(offset)
      .limit(limit)
      .leftJoinAndSelect('post.carModel', 'carModel')
      .leftJoinAndSelect('post.carMake', 'carMake')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes')
      .orderBy('post.id', 'DESC')
      .where('user_id = :userId', { userId })
      .getMany();

    return postEntity.map(PostRepository.toPostModel);
  }

  public async createPost(post: PostCreateUpdateModel): Promise<number> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values({
        title: post.title,
        content: post.content,
        carYear: post.carYear,
        carMakeId: post.carMakeId,
        carModelId: post.carModelId,
        userId: post.userId,
      })
      .execute();

    return raw[0].id;
  }

  public async updatePost(post: PostCreateUpdateModel): Promise<number> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        title: post.title,
        content: post.content,
        carYear: post.carYear,
        carMakeId: post.carMakeId,
        carModelId: post.carModelId,
        userId: post.userId,
        updatedAt: new Date(),
      })
      .where('id = :postId', { postId: post.id })
      .execute();

    return post.id;
  }

  public async getNewestPosts(
    limit?: number,
    offset = 0,
  ): Promise<PostViewModel[]> {
    const postEntity = await this.repository
      .createQueryBuilder('post')
      .offset(offset)
      .limit(limit)
      .leftJoinAndSelect('post.carModel', 'carModel')
      .leftJoinAndSelect('post.carMake', 'carMake')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes')
      .orderBy('post.id', 'DESC')
      .getMany();

    return postEntity.map(PostRepository.toPostModel);
  }

  public async getPostById(postId: number): Promise<PostViewModel> {
    const postEntity = await this.repository
      .createQueryBuilder('post')
      .where('post.id = :postId', { postId })
      .leftJoinAndSelect('post.carModel', 'carModel')
      .leftJoinAndSelect('post.carMake', 'carMake')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes')
      .getOne();

    if (postEntity) {
      return PostRepository.toPostModel(postEntity);
    }
  }

  public async deletePost(postId: number): Promise<void> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where('id = :postId', { postId })
      .execute();
  }
}
