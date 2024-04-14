import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { PostCreateUpdateModel, PostViewModel } from '../model/post.model';
import { CarMakeRepository } from './car-make.repository';
import { CarModelRepository } from './car-model.repository';
import { UserRepository } from './user.repository';
import { LikeRepository } from './like.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schema/post.schema';
import { PostModule } from '../module/post.module';
import { CarMakeDocument } from '../schema/car-make.schema';
import { CarModelDocument } from '../schema/car-model.schema';

@Injectable()
export class PostRepository {
  @InjectModel(Post.name) private model: Model<PostDocument>;

  public static toPostModel(post: PostDocument): PostViewModel {
    return new PostViewModel(
      post.title,
      post.content,
      post.carYear,
      CarMakeRepository.toCarMakeModel(post.carMake as CarMakeDocument),
      CarModelRepository.toCarModelModel(post.carModel as CarModelDocument),
      UserRepository.toUserModel(post.user as UserDocument),
      post.createdAt,
      post.id,
    );
  }

  public async getByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<PostViewModel[]> {
    const postDocs = await this.model
      .find({ user: userId })
      .sort('id')
      .populate(['carMake', 'carModel', 'user'])
      .limit(limit)
      .skip(offset);

    return postDocs.map(PostRepository.toPostModel);
  }

  public async createPost(post: PostCreateUpdateModel): Promise<string> {
    console.log(post);
    const doc = await this.model.create({
      _id: post.id,
      title: post.title,
      content: post.content,
      carYear: post.carYear,
      carMake: post.carMakeId,
      carModel: post.carModelId,
      user: post.userId,
    });

    return doc._id;
  }

  public async updatePost(post: PostCreateUpdateModel): Promise<string> {
    await this.model.findOneAndUpdate(
      { _id: post.id },
      {
        title: post.title,
        content: post.content,
        carYear: post.carYear,
        carMakeId: post.carMakeId,
        carModelId: post.carModelId,
        userId: post.userId,
      },
    );

    return post.id;
  }

  public async getNewestPosts(
    limit: number,
    offset = 0,
  ): Promise<PostViewModel[]> {
    const postDocs = await this.model
      .find()
      .sort('id')
      .populate(['carMake', 'carModel', 'user']) // Error happens here
      .limit(limit)
      .skip(offset);

    return postDocs.map(PostRepository.toPostModel);
  }

  public async getPostById(postId: string): Promise<PostViewModel> {
    const postDoc = await this.model
      .findOne({ _id: postId })
      .populate(['carMake', 'carModel', 'user']);
    console.log({ postId, postDoc });

    return PostRepository.toPostModel(postDoc);
  }

  public async deletePost(postId: string): Promise<void> {
    await this.model.deleteOne({ _id: postId });
  }
}
