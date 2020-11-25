import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Customer } from '../models/Customer.dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {

  constructor(public http: HttpService) {
    super('customer', http);
  }
}
