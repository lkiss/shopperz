import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  const product01 = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 2, price: 10 };
  const product02 = { id: '2', name: 'Product 2', img: 'image2.jpg', availableAmount: 20, minOrderAmount: 5, price: 5 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);

    service.modifyCart(product01, 2);
    service.modifyCart(product02, 6);
  });

  describe('#getProductInCart', () => {
    describe('given product id is provided', () => {
      describe('when product id exist in cart', () => {
        it('should return product track information', () => {
          service.modifyCart(product01, 2);
          expect(service.getProductInCart('1')).toEqual({ quantity: 4, isValid: true });
        });
      })
      describe('when product id does not exist in cart', () => {
        it('should return product track information', () => {
          const newProduct = { id: '3', name: 'Product 3', img: 'image3.jpg', availableAmount: 10, minOrderAmount: 2, price: 10 };
          service.modifyCart(newProduct, 1);
          expect(service.getProductInCart('3')).toEqual({ quantity: 1, isValid: true });
        });
      })
    })
  });

  describe('#modifyCart', () => {
    describe('given user adds product to cart', () => {
      describe('when resulting quantity is more than minimum order', () => {
        describe('and lower than available', () => {
          it('should return with updated product track information', () => {
            service.modifyCart(product01, 2);
            expect(service.getProductInCart('1')).toEqual({ quantity: 4, isValid: true });
          })
          describe('and higher than available', () => {
            it('should return with original product track information', () => {
              service.modifyCart(product01, 20);
              expect(service.getProductInCart('1')).toEqual({ quantity: 2, isValid: true });
            })
          })
        })
      })
      describe('when quantity is lover than minimum order', () => {
        describe('and lower than available', () => {
          it('should return with original product track information', () => {
            service.modifyCart(product01, 1);
            expect(service.getProductInCart('1')).toEqual({ quantity: 2, isValid: true });
          })
        })
        describe('and higher than available', () => {
          it('should return with original product track information', () => {
            service.modifyCart(product01, 20);
            expect(service.getProductInCart('1')).toEqual({ quantity: 2, isValid: true });
          })
        })
      })
    });

    describe('given user removes product to cart', () => {
      describe('when resulting quantity is more than minimum order', () => {
        describe('and lower than available', () => {
          it('should return with updated product track information', () => {
            service.modifyCart(product02, -1);
            expect(service.getProductInCart('2')).toEqual({ quantity: 5, isValid: true });
          })
        })
      })
      describe('when resulting quantity is lover than minimum order', () => {
        describe('and lower than available', () => { 
          it('should return with original product track information', () => {
            service.modifyCart(product02, -3);
            expect(service.getProductInCart('2')).toEqual({ quantity: 6, isValid: true });
          })
         })
      })
    })
  })
});
