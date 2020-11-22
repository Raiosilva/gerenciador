import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ICategory } from '../../interfaces/ICategory';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {

  columns: string[] = ['Nome', 'Descrição', 'uid'];
  dataSource: MatTableDataSource<ICategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(private categoryService: CategoryService) { }

  async ngOnInit() {
    this.bind();
  }
  
  async bind(): Promise<void> {
    const categorys = await this.categoryService.getAll();
    this.dataSource = new MatTableDataSource(categorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(category: ICategory): Promise<void> {
    const  options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir a categoria ${category.name}`
    };
    const { value } = await Swal.fire(options);
    if (value) {
      const result = await this.categoryService.remove(category.uid);
      if (result.success) {
        this.bind();
      }
    }
  }

}
