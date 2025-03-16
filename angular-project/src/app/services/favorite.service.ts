import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import UserInterface from '../../utils/userInterface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}


  getUser(userId: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.apiUrl}/${userId}`);
  }


  addFavorite(userId: string, productId: string): Observable<UserInterface> {
    return this.getUser(userId).pipe(
      switchMap((user: UserInterface) => {
        if (!user.favorites.includes(productId)) {
          user.favorites.push(productId);
        }
        return this.http.put<UserInterface>(`${this.apiUrl}/${userId}`, user);
      })
    );
  }


  removeFavorite(userId: string, productId: string): Observable<UserInterface> {
    return this.getUser(userId).pipe(
      switchMap((user: UserInterface) => {
        if (!user || !user.id) {
          throw new Error('User not found');
        }

        console.log('Removing favorite for user:', user.id, 'Product ID:', productId);

        user.favorites = user.favorites.filter(id => id !== productId);

        return this.http.put<UserInterface>(`${this.apiUrl}/${userId}`, user);
      })
    );
  }


  isFavorite(userId: string, productId: string): Observable<boolean> {
    return this.getUser(userId).pipe(
      map((user: UserInterface) => user.favorites.includes(productId))
    );
  }
}
