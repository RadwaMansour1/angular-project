import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
// import { FavoriteService } from '../../services/favorite.service';
// import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categoryName: string = '';
  faHeart = faHeart;
  faStar = faStar;
  selectedSort: string = 'popular';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    // private cartService: CartService,
    // private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || '';
      if (this.categoryName) {
        this.fetchProducts();
      }
    });
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

  // addToCart(product: Product):void {
  //   this.cartService.addToCart(this.product, this.quantity);
  //   this.router.navigate(['/my-cart']);
  // }


  // toggleFavorite(product: Product): void {
  //   if (!product.id) {
  //     console.error('Error: Product ID is missing');
  //     return;
  //   }

  //   if (this.favoriteService.isFavorite(product.id)) {
  //     this.favoriteService.removeFavorite(product.id);
  //   } else {
  //     this.favoriteService.addFavorite(product);
  //   }
  // }

  // isFavorite(productId: string): boolean {
  //   return this.favoriteService.isFavorite(productId);
  // }

}
