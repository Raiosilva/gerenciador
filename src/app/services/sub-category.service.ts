import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { SubCategory } from '../models/SubCategory.dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService<SubCategory> {

  constructor(public  http: HttpService) {
    super('subcategory', http);
  }
}
