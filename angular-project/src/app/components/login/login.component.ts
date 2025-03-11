import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl:"./login.component.css"
})
export class LoginComponent {

  constructor(private userService:UsersService , private router: Router){}


  email:string = "";
  password:string = "";

  handleLogin(){
    let userExist = false;
    this.userService.getUsers().subscribe({
      next:(res)=>{
       const [user] = res.filter((user)=>user.email === this.email);
       if(user && user.password === this.password){
        this.router.navigate(['/'])
       }else{
        alert("Invalid Email Or Password")
       }
      },
      error:(err)=>{
        console.log(err);
        alert(err);
      }
    })

  }

}


