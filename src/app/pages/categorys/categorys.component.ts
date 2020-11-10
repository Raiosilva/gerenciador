import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/table-data-source';

import { ICategory } from '../../interfaces/ICategory';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {

  columns: string[] = ['Nome', 'Descrição'];
  dataSource: MatTableDataSource<ICategory>;

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
  }

}
