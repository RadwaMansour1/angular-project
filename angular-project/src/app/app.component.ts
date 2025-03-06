import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-project';
}
