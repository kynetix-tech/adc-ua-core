import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class PostRepository {
  constructor(private manager: EntityManager) {}

  // public async getAllByUserId(userId: string): Promise<PostRepository> {
  //
  // }
}
