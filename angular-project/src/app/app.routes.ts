import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: 'products', component: CategoryListComponent },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'products/:category/:productId', component: ProductDetailsComponent },
  {path:'cart',component:CartComponent},
  {path:'payment',component:PaymentComponent}

];
