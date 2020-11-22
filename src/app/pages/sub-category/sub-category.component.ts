import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category.dto';
import { SubCategory } from 'src/app/models/SubCategory.dto';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  model: SubCategory = new SubCategory();
  categorys: Array<Category>;

  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    this.bindCategorys();
  }

  async bindCategorys(): Promise<void> {
    const result = await this.categoryService.getAll();
    if (result.success) {
      this.categorys = result.data as Array<Category>;
    }
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return };

    const result = await this.subCategoryService.getById(uid);
    this.model = result.data as SubCategory;
  }

  async save(): Promise<void> {
    const result = await this.subCategoryService.post(this.model);
    if (result.success) {
      this.matSnack.open('Sub Categoria salva com Sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/subcategorys');
    }
  }

}
