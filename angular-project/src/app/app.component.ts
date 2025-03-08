import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from "./components/profileComponents/profile/profile.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, CategoryListComponent, FontAwesomeModule, CartComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-project';
}
