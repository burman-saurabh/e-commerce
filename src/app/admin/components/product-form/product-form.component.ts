import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/product';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  id;

  // product1 : any = {
  //   key: '',
  //   data: {
  //     title: '',
  //     price: '',
  //     category: '',
  //     imageUrl: ''
  //   }
  // };

  product : Product = {
    key: '',
    title: '',
    price: null,
    category: '',
    imageUrl: ''
  };



  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(product => {
        this.product = product as Product;
        console.log(product);
      });

      // this.productService.getProducts().subscribe(products => {
      //   this.product = products.map(item => {
      //     return {
      //       id: item.key,
      //       ...item.payload.val()
      //     }
      //   })
      // });
    }

    // if (this.id) {
    //   this.productService.getProduct(this.id).subscribe(x => {
    //     console.log(x);
    //     console.log(x.key);
    //     console.log(x.payload.exportVal());
    //     // console.log(x.payload);
    //     let key = x.key;
    //     let data = x.payload.exportVal();

    //     this.product1 = {key, data};
    //   });
    // }

  }

  ngOnInit() {
    // this.categories$ = this.categorySvc.getCategories();
    console.log('inside init');
    this.categories$ = this.categoryService.getCategories();
  }

  saveProduct(product) {
    console.log(product);

    if (this.id) {
      this.productService.update(this.id, product);
      this.toastr.success('Product Updated successfully!');
    }
    else {
      this.productService.save(product);
      this.toastr.success('Product added successfully!');
    }

    /*we are not waiting for the promise above and instantly redirecting the page
    since in products page even if the update takes some time the page will get
    refreshed then. So this gives a better experience to the user.*/
    this.router.navigate(['/admin/products']);
  }

  deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(productId);
    this.toastr.success('Product Deleted successfully!');
    this.router.navigate(['/admin/products']);
  }

}
