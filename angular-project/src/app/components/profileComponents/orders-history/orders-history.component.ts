import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import { Product as ProductWithQuntityTaken} from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-history',
  imports: [CommonModule],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent {

  date:string =  new Date().toLocaleDateString("en-GB",{ day: '2-digit', month: 'short', year: 'numeric' });

  items = new Array(5)
  userOrdersFromData: { orderId: string; products: { productId: string; quantity: number; }[]; totalPrice: number; status: string; date: string; }[]=[];
  displayedOrders: Order[]=[];

  constructor(private userService: UsersService, private productService: ProductService) {
  }

  ngOnInit(){
    this.userOrdersFromData = this.userService.user.orders;

    this.userOrdersFromData.forEach(order => {
      const date= order.date;
      const products = order.products;
      const productsDetails:ProductWithQuntityTaken[] = [];
      const totalPrice = order.totalPrice;
      const status = order.status;
      const orderId = order.orderId;

      products.forEach(product => {
        const productId = product.productId;
        //quantity of the product in the order
        const quantity = product.quantity;
 
        this.productService.getProductById(null,productId).subscribe({
          next: (product: Product|undefined) => {
            if(product) {
              productsDetails.push({...product, quantityUserTake: quantity});          
              }
            
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      });

      this.displayedOrders.push({
        orderId: orderId,
        products: productsDetails,
        totalPrice: totalPrice,
        status: status,
        date: date
      });
    })

   
  }



 
  ddd(){
    console.log(this.displayedOrders);
  }
}
