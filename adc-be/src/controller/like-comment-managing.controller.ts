import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeResponse } from '../dto/responce.dto';
import { RequestWithAuth } from '../types/interfaces';
import { LikeRequest } from '../dto/request.dto';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { AuthGuard } from '@nestjs/passport';

@Controller('like-comment-manage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@ApiTags('LikeCommentManage')
export class LikeCommentManagingController {
  constructor(
    public readonly likeCommentManagingService: LikeCommentManagingService,
    public readonly likeCommentManagingFormatter: LikeCommentManagingFormatter,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: LikeResponse })
  public async addLike(
    @Req() { user }: RequestWithAuth,
    @Body() body: LikeRequest,
  ): Promise<LikeResponse> {
    const likeResponse = await this.likeCommentManagingService.addLike(
      body,
      user.auth0Id,
    );

    return this.likeCommentManagingFormatter.toLikeResponse(likeResponse);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async deleteLike(
    @Req() { user }: RequestWithAuth,
    @Body() body: LikeRequest,
  ) {
    return await this.likeCommentManagingService.deleteLike(body, user.auth0Id);
  }
}
