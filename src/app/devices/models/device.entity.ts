export class Device {
  id: number;
  name: string;
  token: string;
  deviceType: string;
  status: string;

  constructor(id: number, name: string, token: string, deviceType: string, status: string) {
    this.id = id;
    this.name = name;
    this.token = token;
    this.deviceType = deviceType;
    this.status = status;
  }
}
