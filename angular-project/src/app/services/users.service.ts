import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserInterface from '../../utils/userInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private _user: UserInterface | null = null;

  set user(user: UserInterface) {
    this._user = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  get user() {
    if (this._user === null) {
      const user = localStorage.getItem("currentUser");
      if (user) {
        this._user = JSON.parse(user);
      }
    }
    return this._user!;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("currentUser") !== null;
  }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>("http://localhost:3000/users");
  }

  setUser(data: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>("http://localhost:3000/users", data);
  }

  getUserById(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`http://localhost:3000/users/${id}`);
  }

  deleteUser(id: string): Observable<UserInterface> {
    console.log('Deleting user with ID:', id);
    return this.http.delete<UserInterface>(`http://localhost:3000/users/${id}`);
  }

  async removeItemFromCart(userId: string, productId: string): Promise<UserInterface> {
    try {
      const user = await this.http.get<UserInterface>(`http://localhost:3000/users/${userId}`).toPromise();

      if (!user) {
        throw new Error('User not found');
      }

      user.cart = user.cart.filter(item => item.productId !== productId);

      const updatedUser = await this.http.put<UserInterface>(`http://localhost:3000/users/${userId}`, user).toPromise();

      this.user = updatedUser!;

      return updatedUser!;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  updateUser(id: string, newData: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`http://localhost:3000/users/${id}`, newData);
  }
}
