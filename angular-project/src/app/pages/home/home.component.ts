import { Component } from '@angular/core';
import { SliderComponent } from "../../components/slider/slider.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { PartnersComponent } from "../../components/partners/partners.component";
import { AboutHomeComponent } from "../../components/about-home/about-home.component";
import { SignupHomeComponent } from "../../components/signup-home/signup-home.component";

@Component({
  selector: 'app-home',
  imports: [SliderComponent, CategoriesComponent, PartnersComponent, AboutHomeComponent, SignupHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
