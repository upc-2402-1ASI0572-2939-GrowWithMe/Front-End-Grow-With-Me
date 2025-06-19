export class Notification {
  constructor(
    public id: number,
    public farmerId: number,
    public title: string,
    public message: string,
    public date: Date,
    public selected?: boolean,
    public status?: string
  ) {}
}

