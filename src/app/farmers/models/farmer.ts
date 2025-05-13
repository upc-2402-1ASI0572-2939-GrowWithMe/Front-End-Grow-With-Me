import {Crop} from '../../crops/models/crop.entity';

export class Farmer {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public numberOfCrops: number,
    public crops?: Crop[],
  ) {}
}
