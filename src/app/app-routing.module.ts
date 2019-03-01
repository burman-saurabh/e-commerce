import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';
import { adminRoutes } from './admin/admin-routing.module';
import { shoppingRoutes } from './shopping/shopping-routing.module';
import { coreRoutes } from './core/core-routing.module';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  ...coreRoutes,
  ...adminRoutes,
  ...shoppingRoutes,
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
