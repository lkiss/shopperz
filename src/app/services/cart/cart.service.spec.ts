import { TestBed } from '@angular/core/testing';
import { CartService, INITIAL_CART } from './cart.service';
import { Product } from '../product/product.service';
import { appConfig } from '../../app.config';
import { ApplicationConfig } from '@angular/core';


describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: INITIAL_CART, useValue: {} }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty cart', () => {
    expect(service.getProductInCart('1')).toBeUndefined();
  });

  it('should add a product to the cart', () => {
    service.modifyCart('1', 2);
    expect(service.getProductInCart('1')).toEqual({ quantity: 2 });
  });

  it('should modify the quantity of an existing product in the cart', () => {
    service.modifyCart('1', 2);
    service.modifyCart('1', 3);
    expect(service.getProductInCart('1')).toEqual({ quantity: 5 });
  });

  it('should set the product quantity to 0 if modification results in negative quantity', () => {
    service.modifyCart('1', 2);
    service.modifyCart('1', -3);
    expect(service.getProductInCart('1')).toEqual({ quantity: 0 });
  });

  it('should check if order amount is enough', () => {
    const product = { minOrderAmount: 5 } as Product;
    expect(service.isOrderAmountEnough(6, product)).toBeTrue();
    expect(service.isOrderAmountEnough(4, product)).toBeFalse();
  });

  it('should check if more product is available', () => {
    const product = { availableAmount: 10, id: '1' } as Product;
    service.modifyCart('1', 2);
    expect(service.isMoreProductAvailable(7, product)).toBeTrue();
    expect(service.isMoreProductAvailable(9, product)).toBeFalse();
  });
});