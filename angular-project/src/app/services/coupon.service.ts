import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/cuopon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }
  private couponURL="http://localhost:3000/coupons";

  getCoupons():Observable<Coupon[]>{
    return this.http.get<Coupon[]>(this.couponURL);
  }

  changeValid(id: number, newValid: boolean) {
    return this.http.patch(`${this.couponURL}/${id}`, { valid: newValid });
  }
  

}
