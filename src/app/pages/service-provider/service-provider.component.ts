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
import { IAddressState } from '../../interfaces/IAddressState';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  model: ServiceProvider = new ServiceProvider();
  categoriesCare: Array<string> = new Array<string>();
  subCategoriesSelect: Array<SubCategory> = new Array<SubCategory>();
  categories: Array<Category>;
  subCategories: Array<SubCategory>;
  subCategorySelect: SubCategory = new SubCategory();
  categorySelect: string = '';
  cities: Array<string> = new Array<string>();
  citiesCare: Array<string> = new Array<string>();
  states: Array<IAddressState> = new Array<IAddressState>();

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
    this.bindStates();
  }

  async bindCategorys(): Promise<void> {
    const result = await this.categoryService.getAll();
    if (result.success) {
      this.categories = result.data as Array<Category>;
    }
  }

  async bindStates(): Promise<void> {
    const result = await this.addressService.getAllStates();
    if (result.success) {
      this.states = result.data as Array<IAddressState>;
    }
  }

  async bindCities(state: string): Promise<void> {
    this.citiesCare = new Array<string>();
    const result = await this.addressService.getAllCities(state);
    if (result.success) {
      this.cities = result.data as Array<string>;
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
    this.bindCities(this.model.state);
    this.citiesCare = this.model.citiesCare.split(',');
    this.categoriesCare = this.model.categoriesCare.split(',');
  }

  async save(): Promise<void> {
    this.model.citiesCare = this.citiesCare.join(', ');
    this.model.categoriesCare = this.categoriesCare.join(', ');
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

  selectSubCategory(subCategory: SubCategory): void {
    const exists = this.categoriesCare.filter(x => x === subCategory.name).length > 0;
    if (!exists) {
      this.categoriesCare.push(subCategory.name);
    } else {
      this.matSnack.open(`A Sub Categoria ${subCategory.name} já foi adicionada!`, undefined, { duration: 3000 });
    }
  }

  selectCitiesCare(citie: any): void {
    const exists = this.citiesCare.indexOf(citie) > -1;
    if (!exists) {
      this.citiesCare.push(citie);
    } else {
      this.matSnack.open(`A Cidade ${citie} já foi adicionada!`, undefined, { duration: 3000 });
    }
  }

  removeCitiesCare(index: number): void {
    this.citiesCare.splice(index, 1);
  }

  removeCategoryCare(index: number): void {
    this.categoriesCare.splice(index, 1);
  }
}