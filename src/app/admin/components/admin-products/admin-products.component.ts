import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  constructor( private productService: ProductService) { }

  ngOnInit() {
    
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = this.filteredProducts = products as Product[];
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(filterString){
    console.log(filterString);

    this.filteredProducts = filterString? this.products.filter( product => {
      return product.title.toLowerCase().includes(filterString.toLowerCase())}) : this.products;

  }

}
