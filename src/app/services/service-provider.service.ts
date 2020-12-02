import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceProvider } from '../models/ServiceProvider.dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends BaseService<ServiceProvider> {

  constructor(public http: HttpService) {
    super('serviceProvider', http);
   }
}
