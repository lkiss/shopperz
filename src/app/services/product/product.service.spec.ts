import { TestBed } from '@angular/core/testing';
import { ProductService, Product } from './product.service';
import { environment } from '../../../environments/environment';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
        ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products as an Observable', () => {
    const dummyProducts: Product[] = [
      { id: '1', name: 'Product 1', img: 'img1.jpg', availableAmount: 10, minOrderAmount: 1, price: 100, orderAmount: 1 },
      { id: '2', name: 'Product 2', img: 'img2.jpg', availableAmount: 20, minOrderAmount: 2, price: 200, orderAmount: 2 }
    ];

    service.getProducts$().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/${service['productsUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should return products array', () => {
    const dummyProducts: Product[] = [
      { id: '1', name: 'Product 1', img: 'img1.jpg', availableAmount: 10, minOrderAmount: 1, price: 100, orderAmount: 1 }
    ];

    service['products'] = dummyProducts;
    const products = service.getProducts();
    expect(products).toEqual(dummyProducts);
  });
});
