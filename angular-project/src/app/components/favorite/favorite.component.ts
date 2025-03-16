import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { ProductService } from '../../services/product.service';
import { UsersService } from '../../services/users.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: Product[] = [];
  faHeart = faHeart;
  faStar = faStar;
  faEye = faEye;
  faTrash = faTrash;
  userId: string = '';

  constructor(
    private favoriteService: FavoriteService,
    private productService: ProductService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.usersService.user?.id || '';

    if (this.userId) {
      this.loadFavorites();
    }
  }


  loadFavorites(): void {
    this.favoriteService.getUser(this.userId).subscribe(user => {
      if (user.favorites && user.favorites.length) {
        this.productService.getProducts().subscribe(products => {
          this.favoriteProducts = products.filter(product => user.favorites.includes(product.id));
        });
      }
    });
  }


  removeFavorite(productId: string): void {
    this.favoriteService.removeFavorite(this.userId, productId).subscribe(user => {
      this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== productId);
    });
  }

  viewProductDetails(product: Product): void {
    this.router.navigate(['/products', product.category, product.id]);
  }
}
