import { Injectable } from '@nestjs/common';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { PostCreateModel, PostViewModel } from '../model/post.model';
import { CarMakeRepository } from './car-make.repository';
import { CarModelRepository } from './car-model.repository';
import { UserRepository } from './user.repository';

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
      post.createdAt,
      post.updatedAt,
      post.likes,
      post.id,
    );
  }

  public async getAllByUserId(userId: string): Promise<PostViewModel[]> {
    const postEntity = await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.carModel', 'carModel')
      .leftJoinAndSelect('post.carMake', 'carMake')
      .leftJoinAndSelect('post.user', 'user')
      .where('user_id = :userId', { userId })
      .getMany();

    return postEntity.map(PostRepository.toPostModel);
  }

  public async createPost(post: PostCreateModel): Promise<number> {
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
}
