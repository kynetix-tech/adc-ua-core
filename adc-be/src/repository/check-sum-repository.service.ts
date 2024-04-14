import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { ChecksumEntity } from '../entity/checksum.entity';
import { CheckSumModel } from '../model/checkSumModel';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schema/post.schema';
import { Model } from 'mongoose';
import { PostModule } from '../module/post.module';
import { Checksum, ChecksumDocument } from '../schema/checksum.schema';

@Injectable()
export class CheckSumRepository {
  @InjectModel(Checksum.name) private model: Model<ChecksumDocument>;

  public async getFileNameByCheckSumIfExists(
    checkSum: string,
    userId: string,
  ): Promise<string> {
    const doc = await this.model.findOne({
      $and: [{ checkSum: checkSum }, { user: userId }],
    });

    return doc?.fileName || '';
  }

  public async setNewCheckSum(checkSumModel: CheckSumModel): Promise<number> {
    const doc = await this.model.create({
      checkSum: checkSumModel.checkSum,
      fileName: checkSumModel.fileName,
      userId: checkSumModel.userId,
    });

    return doc.id;
  }
}
