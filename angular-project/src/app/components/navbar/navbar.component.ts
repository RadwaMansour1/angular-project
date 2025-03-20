import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  counter: number = 0;
  favcounter: number = 0;

  constructor(private userService: UsersService, private router: Router) {}  

  ngOnInit(): void {
    
      this.counter = this.userService.user.cart.length;
      this.favcounter = this.userService.user.favorites.length;
    
  }

  sidebaropen = false;

  toggleSidebar = () => {
    this.sidebaropen = !this.sidebaropen;
  };

  checkLoginAndNavigate(route: string) {
    if (!this.userService.user) {
      alert("You must log in first!");
    } else {
      this.router.navigate([route]);  
    }
  }
}
