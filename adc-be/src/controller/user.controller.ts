import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRegisterRequest } from '../dto/request.dto';
import { UserResponse } from '../dto/responce.dto';
import { UserFormatter } from '../formatter/user.formatter';
import { UserService } from '../service/user.service';
import { RequestWithAuth } from '../types/interfaces';

@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFormatter: UserFormatter,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponse })
  public async register(
    @Body() body: UserRegisterRequest,
    @Req() { user }: RequestWithAuth,
  ): Promise<UserResponse> {
    const { auth0Id } = user;
    const newUser = await this.userService.upsertUser(body, auth0Id);

    return this.userFormatter.toUserResponse(newUser);
  }

  @Get('current')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getCurrentUser(
    @Req() { user }: RequestWithAuth,
  ): Promise<UserResponse> {
    const { auth0Id } = user;
    const currentUser = await this.userService.getById(auth0Id);

    return this.userFormatter.toUserResponse(currentUser);
  }
}
