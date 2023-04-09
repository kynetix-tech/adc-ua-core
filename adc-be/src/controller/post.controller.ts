import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
  constructor(
    private readonly postService: PostService,
    private readonly postFormatter: PostFormatter,
  ) {}

  @Get('all/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: PostResponse, isArray: true })
  public async getAllByUserId(@Param('userId') userId: string) {
    const posts = await this.postService.getAllItemsByUserId(userId);

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
}
