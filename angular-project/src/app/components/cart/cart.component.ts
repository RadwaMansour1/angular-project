import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-cart',
  imports: [RouterModule,CurrencyPipe,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CurrencyPipe] 

})
export class CartComponent implements OnInit{
  // amount:number =58200;
productsInUserCart:{productId:string, quantity:number}[]=[]; //cart from users.json




constructor(
  private userService: UsersService,
  private _productService: ProductService
) {
 
}
 

ngOnInit(): void {
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

    // this._productService.getProductById("Laptops & Computers", cartItem.productId).subscribe((product)=>{
    //   if(product && product.id){
    //     this.productsInCart.push({
    //       ...product, quantity: cartItem.quantity
         
    //     })
    //   }
    // });
  });
}
 

 




  productsInCart: Product[]=[
    // {id:1, name: 'Product 1', price: 58600, quantity:1, img: 'images/1.jpeg'},
    // {id:2, name: 'Product 2', price: 18000, quantity:3, img: 'images/1.jpeg'},
    // {id:3, name: 'Product 3', price: 26400, quantity:2, img: 'images/1.jpeg'},

  ];

  calculateTotal():number{
    let total = 0;
    this.productsInCart.forEach(product => {
      total += product.price * product.quantityUserTake;
      });
      return total;
  }

 async removeFromCart(e:string|number):Promise<void>{
    // this.userService.user.cart = this.userService.user.cart.filter(
    //   (product) => product.productId !== e
    // ) as { productId: string; quantity: number }[];
    
    // this.userService.user.cart = this.userService.user.cart.filter(product => product.productId !== e) as { productId: string; quantity: number; }[];
    // this.userService.user.cart = [...this.userService.user.cart.filter(product => product.productId !== e)];

    // const cart = this.userService.user.cart;
    // for (let i = 0; i < cart.length; i++) {
    //   if (cart[i].productId === e) {
    //     cart.splice(i, 1);
    //     break; // Exit loop after removing the first matching item
    //   }
    // }
    // this.userService.user.cart = cart;
    // console.log(this.userService.user.cart )

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
// constructor(private currencyPipe: CurrencyPipe){}
// formatCurrency(amount: number): string {
//   return (this.currencyPipe.transform(amount, 'EGP', 'symbol', '1.0-0') || '').replace('EGP', ' EGP');
// }

}
