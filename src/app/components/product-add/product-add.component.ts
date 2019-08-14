import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {Category} from '../../models/category';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {ProductAdd} from '../../models/product-add';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  private categories: Category[] = [];
  private form = this.fb.group({
    name: ['', Validators.required],
    categoryId: ['', Validators.required]
  });
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);

  }

  onAdd(): void {
    const {name, categoryId} = this.form.value;
    this.productService.addProduct(new ProductAdd(name, categoryId));
  }

}
