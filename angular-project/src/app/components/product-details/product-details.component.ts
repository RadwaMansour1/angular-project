import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersService } from '../../services/users.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit {
  @Input() product!: Product;
  quantity: number = 1;
  faHeart = faHeart;
  isFavorite: boolean = false;
  faStar = faStar;
  category: string | null = null;
  productId: string | null = null;
  activeTab: string = 'details';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UsersService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.productId = params.get('productId');

      console.log('Category:', this.category);
      console.log('Product ID:', this.productId);

      if (this.category && this.productId) {
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    if (this.category && this.productId) {
      this.productService.getProductById(this.category, this.productId).subscribe((product) => {
        console.log('Filtered Product:', product);
        this.product = product as Product;
      });
    }
  }

  increaseQuantity() {
    if (this.quantity < this.product?.quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  addToCart() {
    if (!this.product) return;

    const user = this.userService.user;
    if (!user || !user.id) {
      alert('Please log in to add items to your cart.');
      return;
    }

    this.cartService.addToCart(user.id, this.product.id.toString(), this.quantity)
      .then(() => {
        alert(`${this.quantity} ${this.product.name}(s) added to your cart!`);
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add to cart. Please try again.');
      });
  }

}
