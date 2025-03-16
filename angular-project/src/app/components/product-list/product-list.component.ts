import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FavoriteService } from '../../services/favorite.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  favoriteProductIds: string[] = [];
  categoryName: string = '';
  faHeart = faHeart;
  faStar = faStar;
  faEye = faEye;
  selectedSort: string = 'popular';
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.usersService.user?.id || '';

    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || '';
      if (this.categoryName) {
        this.fetchProducts();
      }
    });

    this.loadFavorites();
  }

  fetchProducts(): void {
    this.productService.getProductsByCategory(this.categoryName).subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({
          ...product,
          rating: product.rating || 3
        }));
        this.sortProducts();
      },
      error => console.error("Error fetching products:", error)
    );
  }


  viewProductDetails(product: Product): void {
    this.router.navigate(['/products', product.category, product.id]);
  }


  sortProducts(): void {
    switch (this.selectedSort) {
      case 'topRated':
        this.products.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowToHigh':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        this.products.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
  }


  loadFavorites(): void {
    if (!this.userId) return;

    this.favoriteService.getUser(this.userId).subscribe(user => {
      this.favoriteProductIds = user.favorites || [];
    });
  }


  toggleFavorite(product: Product, event: Event): void {
    event.stopPropagation();

    if (!this.userId) {
      console.warn("User is not logged in!");
      return;
    }

    if (this.favoriteProductIds.includes(product.id)) {
      this.favoriteService.removeFavorite(this.userId, product.id).subscribe(user => {
        this.favoriteProductIds = user.favorites || [];
      });
    } else {
      this.favoriteService.addFavorite(this.userId, product.id).subscribe(user => {
        this.favoriteProductIds = user.favorites || [];
      });
    }
  }

  isFavorite(productId: string): boolean {
    return this.favoriteProductIds.includes(productId);
  }
}

