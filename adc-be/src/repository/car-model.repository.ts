import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { CarModelEntity } from '../entity/car-model.entity';
import { CarModelModel } from '../model/car-model.model';

@Injectable()
export class CarModelRepository {
  private queryBuilder: SelectQueryBuilder<CarModelEntity>;

  constructor(private manager: EntityManager) {
    this.queryBuilder = this.manager
      .getRepository(CarModelEntity)
      .createQueryBuilder('car_model');
  }

  public static toCarModelModel(carModelEntity: CarModelEntity) {
    return new CarModelModel(carModelEntity.id, carModelEntity.title);
  }

  public async getAllModelsByMake(
    makeId: number,
    likeStr: string,
  ): Promise<CarModelModel[]> {
    const models = await this.queryBuilder
      .where(`make_id = :makeId AND UPPER(title) like UPPER('%${likeStr}%')`, {
        makeId,
        likeStr,
      })
      .getMany();

    return models.map(CarModelRepository.toCarModelModel);
  }
}
