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

  modifyCart(product: Product, quantity: number): ProductTrack {
    if (!this.cart[product.id]) {
      this.cart[product.id] = { quantity: quantity, isValid: true };
      return this.cart[product.id];
    }

    if ((quantity > product.availableAmount && quantity > 0) || (quantity < product.minOrderAmount && quantity > 0)) {
      return this.cart[product.id];
    }

    const modificationResult = this.cart[product.id].quantity + quantity;

    if (modificationResult <= 0) {
      const deletedProduct = this.cart[product.id];
      delete this.cart[product.id];
      return { ...deletedProduct, quantity: 0 };
    }

    if (modificationResult > 0 && modificationResult < product.minOrderAmount) {
      return this.cart[product.id];
    }

    if (modificationResult >= product.availableAmount) {
      return this.cart[product.id];
    }

    this.cart[product.id] = { ...this.cart[product.id], quantity: modificationResult };
    return this.cart[product.id];
  }
}

export type ProductTrack = {
  quantity: number;
  isValid: boolean;
}