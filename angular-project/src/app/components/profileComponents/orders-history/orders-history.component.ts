import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-history',
  imports: [],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent {

  date:string =  new Date().toLocaleDateString("en-GB",{ day: '2-digit', month: 'short', year: 'numeric' });

  items = new Array(5)

}
