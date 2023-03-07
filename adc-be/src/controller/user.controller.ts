import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../dto/responce.dto';
import { UserRegisterRequest } from '../dto/request.dto';
import { UserModel } from '../model/user.model';
import { UserFormatter } from '../formatter/user.formatter';
import { AuthGuard } from '@nestjs/passport';
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
    @Req() req: RequestWithAuth,
  ): Promise<UserResponse> {
    const { auth0Id } = req.user;
    const user = await this.userService.upsertUser(
      new UserModel(auth0Id, body.email, body.name),
    );

    return this.userFormatter.toUserResponse(user);
  }
}
