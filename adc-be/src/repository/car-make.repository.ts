import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { CarMakeEntity } from '../entity/car-make.entity';
import { CarMakeModel } from '../model/car-make.model';

@Injectable()
export class CarMakeRepository {
  private queryBuilder: SelectQueryBuilder<CarMakeEntity>;

  constructor(private manager: EntityManager) {
    this.queryBuilder = this.manager
      .getRepository(CarMakeEntity)
      .createQueryBuilder('car_make');
  }

  public static toCarMakeModel(carMakeEntity?: CarMakeEntity) {
    return new CarMakeModel(carMakeEntity.id, carMakeEntity.title);
  }

  public async getCarMakesLike(
    likeStr: string,
    limit: number,
  ): Promise<CarMakeModel[]> {
    const carMakesEntity = await this.queryBuilder
      .where(`title ILIKE '%' || :likeStr || '%'`, { likeStr })
      .limit(limit)
      .getMany();

    return carMakesEntity.map(CarMakeRepository.toCarMakeModel);
  }
}
