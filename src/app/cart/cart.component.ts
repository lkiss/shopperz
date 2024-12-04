import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CartService, ProductTrack } from '../services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../services/product/product.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    this.products = this.productService.getProducts();
  }

  getProductOrder() {
    this.productOrders = Object.entries(this.cartService.getCart())
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

  calculateOrderPrice(productTrack: { productId: string, productTrack: ProductTrack }): number {
    const productPrice = this.getProduct(productTrack.productId)?.price || 1;
    return productPrice * productTrack.productTrack.quantity;
  }

  getTotalPrice(): number {
    const cart = this.cartService.getCart();
    const productIds = Object.keys(cart);

    return productIds
      .map(productId => {
        const product = this.getProduct(productId);
        if (product) {
          return product.price * cart[productId].quantity;
        }
        return 0;
      })
      .reduce((acc, price) => acc + price, 0);
  }

  removeProduct(productId: string) {
    this.cartService.modifyCart(productId, -this.cartService.getProductInCart(productId).quantity);
    this.getProductOrder();
  }

  getDefaultImage() {
    return this.defaultImage;
  }
}
