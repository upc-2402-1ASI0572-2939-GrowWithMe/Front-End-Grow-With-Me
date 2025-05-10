export class Consultation {
  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public status: string,
    public farmerId: string,
    public sensorData: string,
    public id: number
  ) {}
}
