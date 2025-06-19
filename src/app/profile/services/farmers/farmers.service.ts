import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Farmer} from '../../models/farmer.entity';
import {BaseService} from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class FarmersService extends BaseService<Farmer> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/farmers';
  }
}
