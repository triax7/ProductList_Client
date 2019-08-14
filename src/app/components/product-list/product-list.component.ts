import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private products: Product[];
  private totalProducts: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.products.subscribe(list => {
      this.products = list.products;
      this.totalProducts = list.totalProducts;
    });
    this.productService.getAll(1);
  }

  pageChanged(event: PageChangedEvent): void {
    this.productService.getAll(event.page);
  }
}
