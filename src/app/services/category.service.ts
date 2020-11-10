import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from '../base/base.service';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<any> {

  constructor(public http: HttpService) {
    super('category', http);
  }

}
