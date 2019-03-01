import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService, private router: Router,
    private route: ActivatedRoute, private cartService: ShoppingCartService) {
    console.log('inside constructor');
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
    console.log('inside ngOnInit');

  }

  private applyFilter() {
    this.filteredProducts = this.category ? this.products.filter(product => {
      return product.category === this.category
    }) : this.products;
  }

  private populateProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products as Product[];
      this.filteredProducts = this.products; //

      this.route.queryParamMap.subscribe((params) => {
        this.category = params.get('category');
        console.log('inside subscribe queryParamMap');
        /**Filtering products */
        this.applyFilter();

      });
    });
  }

  // categorySelected(category){
  //   console.log(category);
  //   this.category = category;

  //   this.filteredProducts = this.category? this.products.filter(product => {
  //     return product.category === this.category
  //   }) : this.products;
  // }



}
