import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from '../service/post.service';
import { PostFormatter } from '../formatter/post.formatter';
import {
  ImageUploadResponse,
  PostCreateUpdateResponse,
  PostResponse,
} from '../dto/responce.dto';
import { RequestWithAuth } from '../types/interfaces';
import { PostCreateUpdateRequest } from '../dto/request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileSchema } from '../common/shemas/shemas';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../common/const';

@ApiTags('Post')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postFormatter: PostFormatter,
  ) {}

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: PostResponse, isArray: true })
  public async getAllByUserId(
    @Param('userId') userId: string,
    @Query('limit') limit: number = DEFAULT_LIMIT,
    @Query('offset') offset: number = DEFAULT_OFFSET,
  ) {
    const posts = await this.postService.getItemsByUserId(
      userId,
      limit,
      offset,
    );

    return this.postFormatter.toPostsResponse(posts);
  }

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostCreateUpdateResponse })
  public async createPost(
    @Req() { user }: RequestWithAuth,
    @Body() body: PostCreateUpdateRequest,
  ): Promise<PostCreateUpdateResponse> {
    const { auth0Id } = user;
    const newPostId = await this.postService.createNewPost(body, auth0Id);

    return this.postFormatter.toPostCreateUpdateResponse(newPostId);
  }

  @Post('upload-image')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponse })
  @ApiConsumes('multipart/form-data')
  @ApiBody(UploadFileSchema)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() { user }: RequestWithAuth,
  ): Promise<ImageUploadResponse> {
    const { auth0Id } = user;
    const fileName = await this.postService.upsertImageForPost(file, auth0Id);

    return this.postFormatter.toImageUploadResponse(fileName);
  }

  @Get('newest')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: PostResponse, isArray: true })
  public async getNewest(
    @Query('limit') limit: number = DEFAULT_LIMIT,
    @Query('offset') offset: number = DEFAULT_OFFSET,
  ): Promise<PostResponse[]> {
    const posts = await this.postService.getNewestPostWithLimit(limit, offset);

    return this.postFormatter.toPostsResponse(posts);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: PostResponse })
  public async getPostById(@Param('id') id: number) {
    const post = await this.postService.getPostById(id);

    return this.postFormatter.toPostResponse(post);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostCreateUpdateResponse })
  public async updatePost(
    @Req() { user }: RequestWithAuth,
    @Body() body: PostCreateUpdateRequest,
  ): Promise<PostCreateUpdateResponse> {
    const { auth0Id } = user;
    const updatePostId = await this.postService.updatePostById(body, auth0Id);

    return this.postFormatter.toPostCreateUpdateResponse(updatePostId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  public async deletePost(@Param('id') postId: number) {
    return null;
  }
}
