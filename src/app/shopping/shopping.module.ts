import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-6-datatable';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    ShoppingCartSummaryComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShippingFormComponent,
    ProductFilterComponent
  ],
  imports: [
    ShoppingRoutingModule,
    SharedModule
    // CommonModule,
    // FormsModule,
    // CustomFormsModule,
    // DataTableModule
  ]
})
export class ShoppingModule { }
