import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { PostCreateModel, PostViewModel } from '../model/post.model';
import { PostCreateRequest } from '../dto/request.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllItemsByUserId(userId: string): Promise<PostViewModel[]> {
    return await this.postRepository.getAllByUserId(userId);
  }

  async createNewPost(
    post: PostCreateRequest,
    userId: string,
  ): Promise<number> {
    const newPostModel = new PostCreateModel(
      post.title,
      post.content,
      post.carYear,
      post.carMakeId,
      post.carModelId,
      userId,
    );

    return await this.postRepository.createPost(newPostModel);
  }
}
