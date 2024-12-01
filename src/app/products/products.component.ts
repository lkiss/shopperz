import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgOptimizedImage } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-products',
  imports: [CommonModule, MatCardModule, MatGridListModule, MatProgressSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products$: Observable<Product[]> = of([]);
  placeholderProducts = Array(6).fill(0);
  defaultImage = 'https://placehold.co/150x150?text=No+Image+Available';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  addToCart(product: Product) {

  }
}
