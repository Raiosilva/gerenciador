import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

import { Category } from '../../models/Category.dto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p =>  this.getId(p.id));
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return };
    const result = await this.categoryService.getById(uid);
    this.category = result.data as Category;
  }

  async save(): Promise<void> {
    const result = await this.categoryService.post(this.category);
    if (result.success) {
      this.matSnack.open('Categoria salva com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/categorys');
    }
  }

}
