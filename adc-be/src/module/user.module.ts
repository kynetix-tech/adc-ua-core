import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserFormatter } from '../formatter/user.formatter';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserFormatter],
})
export class UserModule {}
