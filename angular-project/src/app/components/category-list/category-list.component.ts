import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-category-list',
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );
  }

  navigateToCategory(categoryName: string): void {
    this.router.navigate(['/products', categoryName]);
  }

}
