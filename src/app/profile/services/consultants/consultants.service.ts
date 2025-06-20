import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Consultant} from '../../models/consultant.entity';
import {BaseService} from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultantsService extends BaseService<Consultant> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/consultants';
  }
}
