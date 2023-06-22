import * as path from 'path';
import { extname } from 'path';
import * as fsp from 'fs/promises';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { PostCreateUpdateModel, PostViewModel } from '../model/post.model';
import { PostCreateUpdateRequest } from '../dto/request.dto';
import { generateChecksum, hashFileNameWithSalt } from '../common/util';
import { CheckSumRepository } from '../repository/check-sum-repository.service';
import { CheckSumModel } from '../model/checkSumModel';
import { ConfigService } from '@nestjs/config';
import { ApplicationError } from '../common/aplication.error';

@Injectable()
export class PostService {
  private readonly mediaDirPath: string;
  private readonly saltFileName: string;

  constructor(
    private readonly postRepository: PostRepository,
    private readonly checkSumRepository: CheckSumRepository,
    private readonly configService: ConfigService,
  ) {
    this.mediaDirPath = this.configService.get<string>('media.storageDir');
    this.saltFileName = this.configService.get<string>('media.fileNameSalt');
  }

  private createPostModelFromBody(
    post: PostCreateUpdateRequest,
    userId: string,
  ): PostCreateUpdateModel {
    return new PostCreateUpdateModel(
      post.title,
      post.content,
      post.carYear,
      post.carMakeId,
      post.carModelId,
      userId,
      post.id,
    );
  }

  public async getItemsByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<PostViewModel[]> {
    return await this.postRepository.getByUserId(userId, limit, offset);
  }

  public async getNewestPostWithLimit(
    searchStr: string,
    carMakeId: number,
    carModelId: number,
    limit: number,
    offset: number,
  ): Promise<PostViewModel[]> {
    return await this.postRepository.getNewestPosts(
      searchStr,
      carMakeId,
      carModelId,
      limit,
      offset,
    );
  }

  public async createNewPost(
    post: PostCreateUpdateRequest,
    userId: string,
  ): Promise<number> {
    try {
      const newPostModel = this.createPostModelFromBody(post, userId);

      return await this.postRepository.createPost(newPostModel);
    } catch (e) {
      throw new ValidationFailedError(
        'Validation failed, check if the make, model, and content of the publication are correct',
      );
    }
  }

  public async getPostById(postId: number) {
    const post = await this.postRepository.getPostById(postId);

    if (!post)
      throw new PostNotFoundError(
        `Post with ${postId} not found`,
        HttpStatus.NOT_FOUND,
      );

    return post;
  }

  public async updatePostById(post: PostCreateUpdateRequest, userId: string) {
    const oldPost = await this.getPostById(post.id);

    if (oldPost.user.id !== userId) {
      throw new PostPermissionDenied(
        'User has no right to edit a post that is not his own, permission denied',
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      const updatePostModel = this.createPostModelFromBody(post, userId);

      return await this.postRepository.updatePost(updatePostModel);
    } catch (e) {
      throw new ValidationFailedError(
        'Validation failed, check if the make, model, and content of the publication are correct',
      );
    }
  }

  public async upsertImageForPost(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    if (!file)
      throw new ImageWithIncorrectFormatError(
        'Pass the correct image file format',
      );

    const checkSum = await generateChecksum(file);
    const existingFileName =
      await this.checkSumRepository.getFileNameByCheckSumIfExists(
        checkSum,
        userId,
      );

    if (existingFileName) return existingFileName;

    const date = Date.now().toString();
    const fileName = hashFileNameWithSalt(
      `${userId}-${date}`,
      this.saltFileName,
      extname(file.originalname),
    );

    await this.checkSumRepository.setNewCheckSum(
      new CheckSumModel(checkSum, fileName, userId),
    );

    const filePath = path.join(this.mediaDirPath, fileName);
    await fsp.writeFile(filePath, file.buffer);

    return fileName;
  }

  public async deletePost(postId: number, userId: string): Promise<void> {
    const existingPost = await this.postRepository.getPostById(postId);

    if (existingPost && existingPost.user.id !== userId) {
      throw new PostPermissionDenied('Post delete permission denied');
    }

    return this.postRepository.deletePost(postId);
  }
}

export class ImageWithIncorrectFormatError extends ApplicationError {}
export class PostNotFoundError extends ApplicationError {}
export class PostPermissionDenied extends ApplicationError {}
export class ValidationFailedError extends ApplicationError {}
