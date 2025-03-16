import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Coupon } from '../../models/cuopon';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
      productsInCart: Product[]=[
        {
          id: "1", name: 'Product 1', price: 58600, quantity: 1, imageUrl: 'images/1.jpeg',
          category: '',
          rating: 0,
          description: '',
          quantityUserTake: 0
        },
        {
          id: "2", name: 'Product 2', price: 18000, quantity: 3, imageUrl: 'images/1.jpeg',
          category: '',
          rating: 0,
          description: '',
          quantityUserTake: 0
        },
        {
          id: "3", name: 'Product 3', price: 26400, quantity: 2, imageUrl: 'images/1.jpeg',
          category: '',
          rating: 0,
          description: '',
          quantityUserTake: 0
        },
    
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
     constructor(private _couponService:CouponService){

       const futureYears=15;
      const currentYear= new Date().getFullYear();
      this.years = Array.from({ length: futureYears }, (_, i) => currentYear + i);

     }

     coupon:Coupon[]=[]


     ngOnInit(): void {
       this._couponService.getCoupons().subscribe({
         next:(data)=>{
          console.log(data)
          this.coupon=data;
         },
        //  error:(error)=>{
        //   console.error(error);
        //   }
       })
     }
     
      discount:number=0
      finalTotal:number=this.calculateTotal();
      code:string="";

      isCouponValid:boolean=false;
     handleDisc(code: any): void {
  this.code = code;
  const coupon = this.coupon.find(c => c.code === code);

  if (coupon && coupon.valid) {
    this.isCouponValid=true ;
    this.ValidCredit.controls.coupon.setValue(code);
    this.ValidCredit.controls.coupon.markAsTouched();
    this.ValidCredit.controls.coupon.updateValueAndValidity(); // Forces change detection
    // console.log(this.ValidCredit.controls.coupon.touched)
    this.discount = coupon.discount * 0.01 * this.calculateTotal();
    this.finalTotal -= this.discount;

    // Call API to mark coupon as invalid
    this._couponService.changeValid(coupon.id, false).subscribe(() => {
      // Update the coupon validity locally after the API call succeeds
      coupon.valid = false;
      // this.coupon = this.coupon.filter(c => c.id !== coupon.id); // Remove invalid coupon from the list
    });
  }
}

//credit card validation

CardholderName:string=""
CardNumber:string="";
CVC:number | undefined;


ValidCredit = new FormGroup({
  holderName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]{2,}$')]),
  CardNum: new FormControl(null, [Validators.required, Validators.pattern('^\\d{13,19}$')]),
  CVC: new FormControl(null, [Validators.required, Validators.pattern('^\\d{3,4}$')]),
  coupon: new FormControl(null),
});
      
get invalidCoupon(){
  return this.ValidCredit.controls.coupon.touched && !this.isCouponValid;
}

get nameInvalid() {
  return this.ValidCredit.controls.holderName.invalid && this.ValidCredit.controls.holderName.touched;
}

get cardNumInvalid() {
  return this.ValidCredit.controls.CardNum.invalid && this.ValidCredit.controls.CardNum.touched;
}

get CVCInvalid() {
  return this.ValidCredit.controls.CVC.invalid && this.ValidCredit.controls.CVC.touched;
}

payWithCard(){
  if(!this.nameInvalid && !this.cardNumInvalid && !this.CVCInvalid){
    //check user balance minus user 
  }
}

// pay on delivery

isDisabled = false; 

payOnDel() {
  this.isDisabled = !this.isDisabled; // Toggle the state
  console.log( this.isDisabled)
}
}
