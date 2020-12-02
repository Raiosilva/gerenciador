import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './shared/admin.guard';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubCategorysComponent } from './pages/sub-categorys/sub-categorys.component';
import { QuestionComponent } from './pages/question/question.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ServiceProvidersComponent } from './pages/service-providers/service-providers.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'categorys', component: CategorysComponent, canActivate: [AdminGuard] },
  { path: 'categorys/:id', component: CategoryComponent, canActivate: [AdminGuard] },
  { path: 'subcategorys/:id', component: SubCategoryComponent, canActivate: [AdminGuard] },
  { path: 'subcategorys', component: SubCategorysComponent, canActivate: [AdminGuard] },
  { path: 'questions/:id', component: QuestionComponent, canActivate: [AdminGuard] },
  { path: 'questions', component: QuestionsComponent, canActivate: [AdminGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AdminGuard] },
  { path: 'customers/:id', component: CustomerComponent, canActivate: [AdminGuard] },
  { path: 'serviceproviders', component: ServiceProvidersComponent, canActivate: [AdminGuard] },
  { path: 'serviceproviders/:id', component: ServiceProviderComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
