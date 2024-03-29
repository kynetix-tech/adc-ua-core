import { ContentItem } from '../entity/post.entity';
import { CarMakeModel } from './car-make.model';
import { CarModelModel } from './car-model.model';
import { UserModel } from './user.model';
import { LikeModel } from './like.model';

export class PostViewModel {
  constructor(
    public readonly title: string,
    public readonly content: Array<ContentItem>,
    public readonly carYear: number,
    public readonly carMake: CarMakeModel,
    public readonly carModel: CarModelModel,
    public readonly user: UserModel,
    public readonly likes: LikeModel[] = [],
    public readonly createdAt: Date = null,
    public readonly updatedAt: Date = null,
    public readonly id: number = 0,
  ) {}
}

export class PostCreateUpdateModel {
  constructor(
    public readonly title: string,
    public readonly content: Array<ContentItem>,
    public readonly carYear: number,
    public readonly carMakeId: number,
    public readonly carModelId: number,
    public readonly userId: string,
    public readonly id: number = 0,
  ) {}
}
