export class CheckSumModel {
  constructor(
    public readonly checkSum: string,
    public readonly fileName: string,
    public readonly userId: string,
  ) {}
}
