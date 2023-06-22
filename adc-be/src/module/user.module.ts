import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { UserFormatter } from '../formatter/user.formatter';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserFormatter],
})
export class UserModule {}
