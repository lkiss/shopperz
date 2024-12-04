import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CartService, ProductTrack } from '../services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../services/product/product.service';
import { MatListModule } from '@angular/material/list';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    MatListModule,
    CommonModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  productOrders: { productId: string, productTrack: ProductTrack }[] = [];
  products: Product[] = [];
  defaultImage = 'https://placehold.co/100x100?text=No+Image+Available';


  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.getProductOrder();
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getProductOrder() {
    this.productOrders = Object.entries(this.cartService.getAllOrders())
      .map(([productId, productTrack]) => ({ productId, productTrack }))
      .filter(({ productTrack }) => productTrack.quantity > 0);
  }

  getProduct(productId: string): Product | undefined {
    return this.products.find(product => product.id === productId);
  }

  isAmountEnough(productId: string, productTrack: ProductTrack): boolean {
    const product = this.getProduct(productId);
    return this.cartService.isOrderAmountEnough(productTrack.quantity, product);
  }

  isMoreAvailable(productId: string, productTrack: ProductTrack): boolean {
    const product = this.getProduct(productId);
    return this.cartService.isMoreProductAvailable(productTrack.quantity, product);
  }

  calculateTotalPrice(): number {
    return this.productOrders.reduce((acc, { productId, productTrack }) => {
      const product = this.getProduct(productId);
      return acc + productTrack.quantity * (product?.price || 1);
    }, 0);
  }

  removeProduct(productId: string) {
    this.cartService.modifyCart(productId, -this.cartService.getProductInCart(productId).quantity);
    this.getProductOrder();
  }
}
