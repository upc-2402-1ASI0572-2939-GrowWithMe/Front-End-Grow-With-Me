import {Activity} from './activity.entity';

export class Crop {
  constructor(
    public id: number,
    public farmerId: number,
    public cropActivities: Activity[],
    public productName: string,
    public code: string,
    public category: string,
    public status: string,
    public area: number,
    public location: string,
    public cost: number,
    public registrationDate: Date
  ) {}
}
