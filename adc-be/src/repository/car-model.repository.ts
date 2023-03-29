import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class CarModelRepository {
  constructor(private manager: EntityManager) {}
}
