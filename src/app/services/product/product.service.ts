import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { filter, find, lastValueFrom, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = "wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b";
  private products$: Observable<Product[]> = of([]);
  private products: Product[] = [];
  constructor(private http: HttpClient) { }

  getProducts$(): Observable<Product[]> {
    this.products$ = this.http.get<Product[]>(`${environment.baseApiUrl}/${this.productsUrl}`);
    return this.products$.pipe(
      map(products => products.map(product => ({
        ...product,
        orderAmount: product.minOrderAmount
      }))),
      tap(products => this.products = products)
    );
  }

  getProducts(): Product[] {
    return this.products;
  }
}

export type Product = {
  id: string;
  name: string;
  img: string;
  availableAmount: number;
  minOrderAmount: number;
  price: number;
  orderAmount: number;
};


