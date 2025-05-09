export class Crop {
  constructor(
    public id: string,
    public code: string,
    public productName: string,
    public category: string,
    public area: number,
    public location: string,
    public status: string,
    public cost: number,
    public profitReturn: number,
    public registrationDate: Date,
    public profileId?: number
  ) {}
}
