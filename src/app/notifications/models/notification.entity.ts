export class Notification {
  constructor(
    public id: number,
    public title: string,
    public message: string,
    public type: string,
    public date: Date,
    public selected?: boolean,
    public status?: string,
    public profileId?: number
  ) {}
}

