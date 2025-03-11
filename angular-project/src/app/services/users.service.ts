import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserInterface from '../../utils/userInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<UserInterface[]>{
   return this.http.get<UserInterface[]>("http://localhost:3000/users");
  }

  setUser(data:UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>("http://localhost:3000/users",data);
  }
}
