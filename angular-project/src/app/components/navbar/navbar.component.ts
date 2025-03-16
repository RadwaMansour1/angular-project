import { Component ,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  counter:number=0
  constructor(private userService: UsersService) {
   
  }
  ngOnInit(): void {
     this.counter= this.userService.user.cart.length

  }
 
  sidebaropen=false

   toggleSidebar = ()=>{
    this.sidebaropen=!this.sidebaropen
  }
}
