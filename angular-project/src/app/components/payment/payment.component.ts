import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Coupon } from '../../models/cuopon';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
      productsInCart: Product[]=[
        {id:1, name: 'Product 1', price: 58600, quantity:1, img: 'images/1.jpeg'},
        {id:2, name: 'Product 2', price: 18000, quantity:3, img: 'images/1.jpeg'},
        {id:3, name: 'Product 3', price: 26400, quantity:2, img: 'images/1.jpeg'},
    
      ];
    
      calculateTotal():number{
        let total = 0;
        this.productsInCart.forEach(product => {
          total += product.price * product.quantity;
          });
          return total;
      }
    
      removeFromCart(e:string|number):void{
        this.productsInCart = this.productsInCart.filter(product => product.id !== e);
        this.calculateTotal();
        // this.handleDisc(this.code);
      }



      selectedMonth:string="";
      months=[
        {id:1, name:"January"},
        {id:2, name:"February"},
        {id:3, name:"March"},
        {id:4, name:"April"},
        {id:5, name:"May"},
        {id:6, name:"June"},
        {id:7, name:"July"},
        {id:8, name:"August"},
        {id:9, name:"September"},
        {id:10, name:"October"},
        {id:11, name:"November"},
        {id:12, name:"December"},

      ]

      selectedYear:string="";
      
     years:Number[] = [];
     constructor(){

       const futureYears=15;
      const currentYear= new Date().getFullYear();
      this.years = Array.from({ length: futureYears }, (_, i) => currentYear + i);

     }

      coupon:Coupon[]=[
        {code:"111", discount:0.1},
        {code:"222", discount:0.25},
        {code:"333", discount:0.5},
      ]

      discount:number=0
      finalTotal:number=this.calculateTotal();
      code:string="";
      handleDisc(code:any):void{
        this.code=code;
        const coupon = this.coupon.find(c => c.code === code);
        if (coupon) {
          this.discount= coupon.discount * this.calculateTotal();
          this.finalTotal-=this.discount;
          this.coupon=this.coupon.filter(c=>c.code!==code)

        }
      }

      
}
