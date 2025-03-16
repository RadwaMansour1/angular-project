import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Coupon } from '../../models/cuopon';
import { CouponService } from '../../services/coupon.service';
import { UsersService } from '../../services/users.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
      productsInCart: Product[]=[
    
      ];
          // handle cart part

      calculateTotal():number{
        let total = 0;
        this.productsInCart.forEach(product => {
          total += product.price * product.quantityUserTake;
          });
          return total;
      }
    
      productsInUserCart:{productId:string, quantity:number}[]=[]; //cart from users.json

      async removeFromCart(e:string|number):Promise<void>{
  

        const userId = this.userService.user.id; // Get the user ID
    
        try {
          const updatedUser = await this.userService.removeItemFromCart(userId, e.toString());
          console.log('Cart updated:', updatedUser.cart);
          this.userService.user = updatedUser; // Update local user data
          this.productsInCart = this.productsInCart.filter(product => product.id !== e);
    
          // this.userService.user = { ...updatedUser };
        } catch (error) {
          console.error('Error updating cart:', error);
        }
    
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
     constructor(private _couponService:CouponService,  private userService: UsersService,
       private _productService: ProductService){

       const futureYears=15;
      const currentYear= new Date().getFullYear();
      this.years = Array.from({ length: futureYears }, (_, i) => currentYear + i);

     }

     coupons:Coupon[]=[]


     ngOnInit(): void {
       this._couponService.getCoupons().subscribe({
         next:(data)=>{
          console.log(data)
          this.coupons=data;
         },
         error:(error)=>{
          console.error(error);
          }
       })


       //featch praduct 
       this.productsInUserCart = this.userService.user.cart ;

       // Fetch product details for each cart item
       this.productsInUserCart.forEach(cartItem => {
         this._productService.getProductById(null, cartItem.productId).subscribe({
           next: (data) => {
             if (data && data.id) { // Ensure data is not undefined and has a valid id
               this.productsInCart.push({
                 ...data,
                 quantityUserTake: cartItem.quantity 
               });
             }
           },
             error:(error)=>{
               console.error(error);
               }
         });
     
       
       });
     }
     
      discount:number=0
      finalTotal:number=this.calculateTotal();
      code:string="";
      isCouponValid:boolean=false;
      
isValidCoupon(code:string){
  const coupon = this.coupons.find(c => c.code === code);

  if (coupon && coupon.valid) {
    this.isCouponValid=true ;
   
  }
  else{
    this.isCouponValid=false ;
  }
  
}

     handleDisc(code: any): void {
      // console.log(this.finalTotal)
      // console.log(this.calculateTotal())

  this.code = code;
  const coupon = this.coupons.find(c => c.code === code);

  if (coupon && coupon.valid) {
//     this.isCouponValid=true ;
// console.log(this.isCouponValid)  

    this.discount = coupon.discount * 0.01 * this.calculateTotal();
    this.finalTotal -= this.discount;

    // Call API to mark coupon as invalid
    this._couponService.changeValid(coupon.id, false).subscribe(() => {
      // Update the coupon validity locally after the API call succeeds
      coupon.valid = false;
    });
  }
}

//credit card validation

CardholderName:string=""
CardNumber:string="";
CVC:number | undefined;


ValidCredit = new FormGroup({
  holderName: new FormControl({value: null,disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z ]{2,}$')]),
  CardNum: new FormControl({value: null,disabled: false}, [Validators.required, Validators.pattern('^\\d{13,19}$')]),
  CVC: new FormControl({value: null,disabled: false}, [Validators.required, Validators.pattern('^\\d{3,4}$')]),
  coupon: new FormControl(null),
});
      
get invalidCoupon(){
  console.log(this.isCouponValid)
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
    if(this.userService.user.balance>= (this.calculateTotal()-this.discount)){
      const balance=  this.userService.user.balance - (this.calculateTotal()-this.discount)

      this.userService.updateUser(this.userService.user.id,{...this.userService.user,balance:balance}).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.userService.user=data;
          },
          error:(data)=>{
            console.log(data);
          }
        }
      )
      alert("Processs done");
    }else{
      alert("Insufficient balance");
    }
  }
}

// pay on delivery

isDisabled = false; 

payOnDel() {
//  if( this.ValidCredit.get('holderName')?.enable() && this.ValidCredit.get('cardNum')?.enable() &&this.ValidCredit.get('CVC')?.enable()){
//   this.ValidCredit.get('holderName')?.disable()
//   this.ValidCredit.get('cardNum')?.disable()
//   this.ValidCredit.get('CVC')?.disable()
//  }
//  else{
//   this.ValidCredit.get('holderName')?.enable()
//   this.ValidCredit.get('cardNum')?.enable()
//   this.ValidCredit.get('CVC')?.enable()
//  }
  this.isDisabled = !this.isDisabled; // Toggle the state
  console.log( this.isDisabled)
}
}
