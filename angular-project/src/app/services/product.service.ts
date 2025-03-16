import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = "http://localhost:5001/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }


  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map(products => {
        console.log("All Products from API:", products);
        const filteredProducts = products.filter(product => product.category === category);
        console.log(`Filtered Products for "${category}":`, filteredProducts);
        return filteredProducts;
      })
    );
  }


  // getProductById(category: string, productId: string): Observable<Product | undefined> {
  //   return this.http.get<Product[]>(this.productsUrl).pipe(
  //     map(products => products.find(p => p.category === category && p.id === productId))
  //   );
  // }

  getProductById(category: string | null, productId: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map(products => 
        products.find(p => (category === null || p.category === category) && p.id === productId)
      )
    );
  }
  
}
