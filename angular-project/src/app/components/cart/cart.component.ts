import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  imports: [RouterModule,CurrencyPipe,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CurrencyPipe] 

})
export class CartComponent {
  amount:number =58200;

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
  }
// constructor(private currencyPipe: CurrencyPipe){}
// formatCurrency(amount: number): string {
//   return (this.currencyPipe.transform(amount, 'EGP', 'symbol', '1.0-0') || '').replace('EGP', ' EGP');
// }

}
