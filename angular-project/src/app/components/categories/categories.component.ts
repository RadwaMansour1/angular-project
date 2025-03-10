import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule,RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories =[
    {name:"Laptops",image:"assets/images/products/laptop-3.png"},
    {name:"Laptop Accessories",image:"assets/images/products/ram.png"},
    {name:"Monitors",image:"assets/images/products/monitor.png"},
    {name:"Accessories",image:"assets/images/products/headphones.png"},
  ]
  
  products = [
    { 
      name: 'Lenovo LOQ 15IRH8 Gaming Laptop', 
      price: 32200, 
      image: 'assets/images/products/laptop-3.png' 
    },
    { 
      name: 'Lenovo V15 G2 Laptop', 
      price: 18800, 
      image: 'assets/images/products/laptop-2.png' 
    },
    { 
      name: 'Apple 2022 MacBook Air laptop with M2 chip', 
      price: 58200, 
      image: 'assets/images/products/laptop.png' 
    }
  ];

  indexed: number | null = null;

  showIcons(index: number) {
    this.indexed = index;
  }

  hideIcons() {
    this.indexed = null;
  }
}
