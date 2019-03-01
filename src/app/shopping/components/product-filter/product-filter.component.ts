import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category: string;
  // @Output() categoryClicked = new EventEmitter<string>();
  categories$;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
    // console.log('inside P filter const');
  }

  ngOnInit() {
    // console.log('inside P filter init');
  }

  // categorySelect(category){
  //   console.log(category);
  //   this.categoryClicked.emit(category);
  // }

}
