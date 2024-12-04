import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../services/cart/cart.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';



@Component({
  selector: 'app-products',
  imports: [CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatToolbarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products$: Observable<Product[]> = of([]);
  placeholderProducts = Array(6).fill(0);
  defaultImage = 'https://placehold.co/100x100?text=No+Image+Available';

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.modifyCart(product.id, product.orderAmount);
    product.orderAmount = product.minOrderAmount;
  }

  canAddToCart(product: Product) {
    return this.cartService.isOrderAmountEnough(product.orderAmount, product) && this.cartService.isMoreProductAvailable(product.orderAmount, product);
  }

  getAvailableProductAmount(product: Product) {
    const productTrack = this.cartService.getProductInCart(product.id);
    return productTrack ? product.availableAmount - productTrack.quantity : product.availableAmount;
  }
}
