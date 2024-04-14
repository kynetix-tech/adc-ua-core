import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  @InjectModel(User.name) private model: Model<UserDocument>;

  public static toUserModel(userEntity?: UserDocument): UserModel {
    return new UserModel(
      userEntity.id,
      userEntity.auth0Id,
      userEntity.email,
      userEntity.firstName,
      userEntity.lastName,
      userEntity.gender,
      userEntity.role,
    );
  }

  public async getByAuth0Id(auth0Id: string): Promise<UserModel> {
    console.log({ auth0Id });
    const userDoc = await this.model.findOne({ auth0Id });
    console.log(userDoc);

    if (userDoc) return UserRepository.toUserModel(userDoc);
  }

  public async register(user: UserModel): Promise<string> {
    const doc = await this.model.create({
      _id: user.id,
      auth0Id: user.auth0Id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      role: user.role,
    });

    return doc.id;
  }
}
