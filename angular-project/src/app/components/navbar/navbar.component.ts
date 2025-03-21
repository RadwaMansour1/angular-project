import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  counter: number = 0;
  favcounter: number = 0;
  sidebaropen = false;
  isLoggedIn: boolean = false;

  constructor(private userService: UsersService, private router: Router) {}  

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn(); 

    if (this.isLoggedIn) { 
      const user = this.userService.user;
      this.counter = user.cart ? user.cart.length : 0;
      this.favcounter = user.favorites ? user.favorites.length : 0;
    }

 
    window.addEventListener("storage", () => {
      this.isLoggedIn = this.userService.isLoggedIn();
    });
  }

  toggleSidebar = () => {
    this.sidebaropen = !this.sidebaropen;
  };

  checkLoginAndNavigate(route: string) {
    if (!this.isLoggedIn) {
      alert("You must log in first!");
    } else {
      this.router.navigate([route]);  
    }
  }
}
