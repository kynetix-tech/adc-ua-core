import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { ChecksumEntity } from '../entity/checksum.entity';
import { CheckSumModel } from '../model/checkSumModel';

@Injectable()
export class CheckSumRepository {
  private queryBuilder: SelectQueryBuilder<ChecksumEntity>;

  constructor(private manager: EntityManager) {
    this.queryBuilder = this.manager
      .getRepository(ChecksumEntity)
      .createQueryBuilder('checksum');
  }

  public async getFileNameByCheckSumIfExists(
    checkSum: string,
    userId: string,
  ): Promise<string> {
    const checkSumEntity = await this.queryBuilder
      .where('checksum = :checkSum', { checkSum })
      .andWhere('user_id = :userId', { userId })
      .getOne();

    if (checkSumEntity) return checkSumEntity.fileName;
    return '';
  }

  public async setNewCheckSum(checkSumModel: CheckSumModel): Promise<number> {
    const { raw } = await this.queryBuilder
      .insert()
      .into(ChecksumEntity)
      .values({
        checkSum: checkSumModel.checkSum,
        fileName: checkSumModel.fileName,
        userId: checkSumModel.userId,
      })
      .execute();

    return raw[0].id;
  }
}
