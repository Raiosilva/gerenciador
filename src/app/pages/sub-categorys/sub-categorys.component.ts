import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import { SubCategory } from '../../models/SubCategory.dto';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-sub-categorys',
  templateUrl: './sub-categorys.component.html',
  styleUrls: ['./sub-categorys.component.scss']
})
export class SubCategorysComponent implements OnInit {
  columns: string[] = ['Nome', 'Descrição', 'Categoria', 'uid'];
  dataSource: MatTableDataSource<SubCategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: SubCategoryService 
  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const subCategorys = await this.service.getAll();
    this.dataSource = new MatTableDataSource(subCategorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(subCategory: SubCategory): Promise<void> {
    const  options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir a sub categoria ${subCategory.name}`
    };
    const { value } = await Swal.fire(options);
    if (value) {
      const result = await this.service.remove(subCategory.uid);
      if (result.success) {
        this.bind();
      }
    }
  }

}
