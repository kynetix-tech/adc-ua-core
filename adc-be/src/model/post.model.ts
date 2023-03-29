import { ContentItem } from '../entity/post.entity';
import { CarMakeModel } from './car-make.model';
import { CarModelModel } from './car-model.model';
import { UserModel } from './user.model';

export class PostModel {
  constructor(
    public readonly id: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly title: string,
    public readonly content: Array<ContentItem>,
    public readonly likes: number,
    public readonly carYear: number,
    public readonly carMake: CarMakeModel,
    public readonly carModel: CarModelModel,
    public readonly user: UserModel,
  ) {}
}
