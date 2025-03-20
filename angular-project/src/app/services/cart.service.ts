import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, firstValueFrom } from 'rxjs';
import { Product } from '../models/product.model';
import UserInterface from '../../utils/userInterface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private usersUrl = 'http://localhost:3000/users';
  private productsUrl = 'http://localhost:5001/products';
  cartItems: (Product & { quantity: number })[] = [];

  constructor(private http: HttpClient) {}

  async addToCart(userId: string, productId: string, quantity: number): Promise<void> {
    try {
      const users = await firstValueFrom(this.http.get<UserInterface[]>(this.usersUrl));

      const userIndex = users.findIndex(user => user.id.toString() === userId);
      if (userIndex === -1) {
        console.error('User not found');
        return;
      }

      const user = users[userIndex];

      if (!user.cart) {
        user.cart = [];
      }

      const existingItem = user.cart.find(item => item.productId.toString() === productId.toString());

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({ productId: productId.toString(), quantity });
      }

      await firstValueFrom(this.http.put(`${this.usersUrl}/${userId}`, user));

      console.log('Product added to cart successfully.');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }


  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((products) => {
        return products.find((p) => p.id.toString() === productId.toString())!;
      })
    );
  }


  async fetchCartItems(userId: string): Promise<void> {
    try {
      const users = await firstValueFrom(this.http.get<UserInterface[]>(this.usersUrl));
      const user = users.find(user => user.id.toString() === userId);
      if (!user || !user.cart) {
        this.cartItems = [];
        return;
      }

      const productPromises = user.cart.map(async (cartItem) => {
        const product = await firstValueFrom(this.getProductById(cartItem.productId));
        return product ? { ...product, quantity: cartItem.quantity } : null;
      });

      this.cartItems = (await Promise.all(productPromises)).filter(item => item !== null) as (Product & { quantity: number })[];
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }


  async removeFromCart(userId: string, productId: string): Promise<void> {
    try {
      const users = await firstValueFrom(this.http.get<UserInterface[]>(this.usersUrl));
      const userIndex = users.findIndex(user => user.id.toString() === userId);
      if (userIndex === -1) return;

      const user = users[userIndex];
      user.cart = user.cart.filter((item) => item.productId.toString() !== productId.toString());

      await firstValueFrom(this.http.put(`${this.usersUrl}/${userId}`, user));
      console.log('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }


  async clearCart(userId: string): Promise<void> {
    try {
      const users = await firstValueFrom(this.http.get<UserInterface[]>(this.usersUrl));
      const userIndex = users.findIndex(user => user.id.toString() === userId);
      if (userIndex === -1) return;

      users[userIndex].cart = [];
      await firstValueFrom(this.http.put(`${this.usersUrl}/${userId}`, users[userIndex]));

      console.log('Cart cleared successfully.');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }
}
