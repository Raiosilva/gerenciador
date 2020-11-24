import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Question } from '../models/Question.dto';
import { HttpService } from './http.service';
import { ISelect } from '../interfaces/ISelect';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<Question> {

  constructor(public http: HttpService) {
    super('question', http);
  }

  // static propriedade da classe e não da instância da classe
  static getQuestionsType(): Array<ISelect> {
    return [
      { value: 1, label: 'Text' },
      { value: 2, label: 'Date' },
      { value: 3, label: 'Select' },
      { value: 4, label: 'Memo' },
    ];
  }

}
