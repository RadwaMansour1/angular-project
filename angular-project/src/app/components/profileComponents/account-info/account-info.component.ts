import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms"
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-account-info',
  imports: [FormsModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent{
  constructor(private userService:UsersService){
    console.log(this.userService.user)
    this.firstName = this.userService.user.name.split(" ")[0];
    this.lastName = this.userService.user.name.split(" ")[1];
    this.email = this.userService.user.email;
    this.gender = this.userService.user.gender;
  }
  

  
  firstName:string = "";
  lastName:string = "";
  email:string = "";
  gender:string = "";

  fnameChanged:boolean = false;
  lnameChanged:boolean = false;
  emailChanged:boolean = false;
  genderChanged:boolean = false;
  
  onFnameChange(){
    this.fnameChanged = true
  }
  onLnameChange(){
    this.lnameChanged = true
  }
  onEmailChange(){
    this.emailChanged = true
  }
  onGenderChange(){
    this.genderChanged = true
  }
}
