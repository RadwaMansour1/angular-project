import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    {path:'cart',component:CartComponent},
    {path:'payment',component:PaymentComponent}
];
