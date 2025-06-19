export class Consultation {
  constructor(
    public id: number,
    public farmerId: number,
    public title: string,
    public description: string,
    public date: Date,
    public status: string
  ) {}
}
