import { v4 as uuidv4 } from 'uuid';

export class LikeModel {
  constructor(
    public readonly userId: string,
    public readonly postId: string,
    public readonly id = uuidv4(),
  ) {}
}
