import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
  PostCreationResponse,
  PostResponse,
} from '../dto/responce.dto';
import { RequestWithAuth } from '../types/interfaces';
import { PostCreateRequest } from '../dto/request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileSchema } from '../common/shemas/shemas';

@ApiTags('Post')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@Controller('post')
export class PostController {
  private readonly DEFAULT_LIMIT = 40;
  private readonly DEFAULT_OFFSET = 0;

  constructor(
    private readonly postService: PostService,
    private readonly postFormatter: PostFormatter,
  ) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: PostResponse, isArray: true })
  public async getAllByUserId(
    @Param('userId') userId: string,
    @Query('limit') limit: number = this.DEFAULT_LIMIT,
    @Query('offset') offset: number = this.DEFAULT_OFFSET,
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
  @ApiResponse({ status: HttpStatus.CREATED, type: PostCreationResponse })
  public async createPost(
    @Req() { user }: RequestWithAuth,
    @Body() body: PostCreateRequest,
  ): Promise<PostCreationResponse> {
    const { auth0Id } = user;
    const newPostId = await this.postService.createNewPost(body, auth0Id);

    return this.postFormatter.toPostCreationResponse(newPostId);
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
    @Query('limit') limit: number = this.DEFAULT_LIMIT,
    @Query('offset') offset: number = this.DEFAULT_OFFSET,
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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  public async deletePost(@Param('id') postId: number) {
    return null;
  }
}
