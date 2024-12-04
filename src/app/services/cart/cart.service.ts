import { Injectable } from '@angular/core';
import { Product } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Record<string, ProductTrack> = {};

  constructor() { }

  getProductInCart(id: string): ProductTrack {
    return this.cart[id];
  }

  modifyCart(productId: string, orderAmount: number): ProductTrack {
    if (!this.cart[productId]) {
      this.cart[productId] = { quantity: orderAmount };
      return this.cart[productId];
    }

    const modificationResult = this.cart[productId].quantity + orderAmount;

    // if product is in cart and the order amount is lower 0 set it to empty
    if (modificationResult <= 0) {
      this.cart[productId] = { quantity: 0 };
      return this.cart[productId];
    }

    this.cart[productId] = {quantity: modificationResult};
    return this.cart[productId];
  }

  isOrderAmountEnough(orderAmount: number, product?: Product): boolean {

    return product ? orderAmount >= product.minOrderAmount : false;
  }

  isMoreProductAvailable(orderAmount: number, product?: Product): boolean {
    return product ? orderAmount <= product.availableAmount - (this.cart[product.id]?.quantity || 0)  : true;
  }

  getAllOrderAmounts(): number {
    return Object.values(this.cart).reduce((acc, productTrack) => acc + productTrack.quantity, 0);
  }

  getAllOrders(): Record<string, ProductTrack> {
    return this.cart;
  }
}

export type ProductTrack = {
  quantity: number;
}