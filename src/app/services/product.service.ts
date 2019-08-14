import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ProductList} from '../models/product-list';
import {ProductAdd} from '../models/product-add';
import {Router} from '@angular/router';
import {Product} from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: Subject<ProductList>;
  private lastPage = 1;

  constructor(private http: HttpClient, private router: Router) {
    this.productsSubject = new Subject<ProductList>();
  }

  public get products(): Observable<ProductList> {
    return this.productsSubject.asObservable();
  }

  getAll(page: number): void {
    this.http.get<ProductList>(
      `${environment.apiUrl}/Products`,
      {params: new HttpParams().append('page', page.toString())}
      ).subscribe(list => this.productsSubject.next(list));
    this.lastPage = page;
  }
  addProduct(product: ProductAdd): void {
    this.http.post(`${environment.apiUrl}/Products`, product)
      .subscribe(_ => this.getAll(this.lastPage));
  }
}
