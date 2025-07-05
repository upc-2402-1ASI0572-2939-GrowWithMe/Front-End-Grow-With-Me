export class Device {
  constructor(
    public id: number,
    public cropId: number,
    public farmerId: number,
    public name: string,
    public temperatureList: number[] = [],
    public humidityList: number[] = [],
    public isActive: boolean = false
  ) {}
}
