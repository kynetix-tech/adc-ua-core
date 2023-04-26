import * as path from 'path';
import * as fsp from 'fs/promises';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { PostCreateModel, PostViewModel } from '../model/post.model';
import { PostCreateRequest } from '../dto/request.dto';
import { generateChecksum, hashFileNameWithSalt } from '../common/util';
import { CheckSumRepository } from '../repository/check-sum-repository.service';
import { CheckSumModel } from '../model/checkSumModel';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { ApplicationError } from '../common/aplication.error';
import { of } from 'rxjs';

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

  async getAllItemsByUserId(userId: string): Promise<PostViewModel[]> {
    return await this.postRepository.getAllByUserId(userId);
  }

  async getNewestPostWithLimit(
    limit: number,
    offset: number,
  ): Promise<PostViewModel[]> {
    return await this.postRepository.getNewestPosts(limit, offset);
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

  public async getPostById(postId: number) {
    const post = await this.postRepository.getPostById(postId);

    if (!post)
      throw new PostNotFoundError(
        `Post with ${postId} not found`,
        HttpStatus.NOT_FOUND,
      );

    return post;
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
}

export class ImageWithIncorrectFormatError extends ApplicationError {}
export class PostNotFoundError extends ApplicationError {}
