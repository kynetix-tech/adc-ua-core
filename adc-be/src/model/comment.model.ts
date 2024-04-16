import { UserModel } from './user.model';

export class CommentCreateModel {
  constructor(
    public readonly text: string,
    public readonly postId: string,
    public readonly userId: string,
  ) {}
}

export class CommentViewModel {
  constructor(
    public readonly text: string,
    public readonly postId: number,
    public readonly createdAt: Date,
    public readonly user: UserModel,
    public readonly id: number,
  ) {}
}
