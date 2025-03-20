import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profileComponents/profile/profile.component';
import { OrdersHistoryComponent } from './components/profileComponents/orders-history/orders-history.component';
import { AccountInfoComponent } from './components/profileComponents/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SupportComponent } from './components/support/support.component';

export const routes: Routes = [
  {path:"", component:HomeComponent, title:"Home"},
  { path: 'about', component: AboutUsComponent },
  { path: 'products', component: CategoryListComponent },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'products/:category/:productId', component: ProductDetailsComponent },
  { path: 'favorites', component: FavoriteComponent },
  {path:'cart',component:CartComponent},
  {path:'payment',component:PaymentComponent},
  {path:"login" ,component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'support', component: SupportComponent},
  {path:"profile" ,component:ProfileComponent,title:"profile" ,children:[
    {path:"" ,redirectTo:"accountInfo" ,pathMatch:"full"},
    {path:"ordersHistory" ,component:OrdersHistoryComponent, title:"orders history"},
    {path:"accountInfo" ,component:AccountInfoComponent, title:"account info"},
]},
  {path: "**", component: NotFoundComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
