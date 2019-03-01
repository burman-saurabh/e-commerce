import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from 'angular-6-datatable';
import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';

import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
    // CommonModule,
    // FormsModule,
    // CustomFormsModule,
    // DataTableModule,
    // BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   timeOut: 2000,
    //   preventDuplicates: false
    // })
  ],
  providers: [
    AdminAuthGuardService
  ],
  exports: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent
  ]
})
export class AdminModule { }
