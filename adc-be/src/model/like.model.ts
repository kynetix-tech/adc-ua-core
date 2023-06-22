export class LikeModel {
  constructor(
    public readonly userId: string,
    public readonly postId: number,
    public readonly id = 0,
  ) {}
}
