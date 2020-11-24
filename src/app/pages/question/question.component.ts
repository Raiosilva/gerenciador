import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ISelect } from 'src/app/interfaces/ISelect';
import { Question } from 'src/app/models/Question.dto';
import { SubCategory } from 'src/app/models/SubCategory.dto';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  model: Question = new Question();
  subCategorys: Array<SubCategory>;
  questionsType: Array<ISelect>;

  constructor(
    private subCategoryService: SubCategoryService,
    private questionService: QuestionService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    this.questionsType = QuestionService.getQuestionsType();
    this.bindSubCategorys();
  }

  async bindSubCategorys(): Promise<void> {
    const result = await this.subCategoryService.getAll();
    if (result.success) {
      this.subCategorys = result.data as Array<SubCategory>;
    }
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return };

    const result = await this.questionService.getById(uid);
    this.model = result.data as Question;
  }

  async save(): Promise<void> {
    const result = await this.questionService.post(this.model);
    if (result.success) {
      this.matSnack.open('Pergunta salva com Sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/questions');
    }
  }

}
