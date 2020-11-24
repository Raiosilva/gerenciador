import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

import  { Question } from '../../models/Question.dto';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  columns: string[] = ['Pergunta', 'Tipo', 'SubCategoria', 'uid'];
  dataSource: MatTableDataSource<Question>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: QuestionService 
  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const questions = await this.service.getAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: Question): Promise<void> {
    const  options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir a sub categoria ${model.question}`
    };
    const { value } = await Swal.fire(options);
    if (value) {
      const result = await this.service.remove(model.uid);
      if (result.success) {
        this.bind();
      }
    }
  }
}
