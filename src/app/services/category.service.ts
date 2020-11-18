import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from '../base/base.service';
import { Category } from '../models/Category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  constructor(public http: HttpService) {
    super('category', http);
  }

}
