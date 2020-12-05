import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileManager } from 'src/app/components/input-file/input-file.component';
import { Category } from 'src/app/models/Category.dto';
import { ServiceProvider } from 'src/app/models/ServiceProvider.dto';
import { SubCategory } from 'src/app/models/SubCategory.dto';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceProviderService } from 'src/app/services/service-provider.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  model: ServiceProvider = new ServiceProvider();
  subCategoriesSelect: Array<SubCategory> = new Array<SubCategory>();
  categories: Array<Category>;
  subCategories: Array<SubCategory>;

  constructor(
    private service: ServiceProviderService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private addressService: AddressService,
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
      this.categories = result.data as Array<Category>;
    }
  }

  async bindSubCategorys(categoryUid: string): Promise<void> {
    const result = await this.subCategoryService.getAllByCategory(categoryUid);
    if (result.success) {
      this.subCategories = result.data as Array<SubCategory>;
    }
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return };

    const result = await this.service.getById(uid);
    this.model = result.data as ServiceProvider;
  }

  async save(): Promise<void> {
    const result = await this.service.post(this.model);
    if (result.success) {
      this.matSnack.open('Prestador salva com Sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/servicesproviders');
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.model.photo = file.base64Data;
    }
  }

}