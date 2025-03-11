import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profileComponents/profile/profile.component';
import { OrdersHistoryComponent } from './components/profileComponents/orders-history/orders-history.component';
import { ProfilePaymentComponent } from './components/profileComponents/payment/payment.component';
import { AccountInfoComponent } from './components/profileComponents/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
  {path:"", component:HomeComponent, title:"Home"},
  { path: 'products', component: CategoryListComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'products/:category/:productId', component: ProductDetailsComponent },
  {path:'cart',component:CartComponent},
  {path:'payment',component:PaymentComponent},
  {path:"login" ,component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile" ,component:ProfileComponent,title:"profile" ,children:[
    {path:"" ,redirectTo:"accountInfo" ,pathMatch:"full"},
    {path:"payment" ,component:ProfilePaymentComponent, title:"payment&address"},
    {path:"ordersHistory" ,component:OrdersHistoryComponent, title:"orders history"},
    {path:"accountInfo" ,component:AccountInfoComponent, title:"account info"},
]}
];
