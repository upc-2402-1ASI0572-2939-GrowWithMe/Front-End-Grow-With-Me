import {Crop} from '../../crops/models/crop.entity';

export class Farmer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string
  ) {
  }
}
