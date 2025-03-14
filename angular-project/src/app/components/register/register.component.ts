import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import UserInterface from '../../../utils/userInterface';
import {v4 as uuid} from "uuid"
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl:"./register.component.css"
})
export class RegisterComponent {

  constructor(private userService:UsersService,private router:Router){
  }

gender:string="Male";

setGender(event:Event){
  this.gender = (event.target as HTMLInputElement).value;
}

  regValidation = new FormGroup({
    firstName : new FormControl("",[Validators.required , Validators.pattern(/^[A-Z][a-z]{2,}/)]),
    lastName : new FormControl("",[Validators.required , Validators.pattern(/^[A-Z][a-z]{2,}/)]),
    email : new FormControl("",[Validators.required , Validators.pattern(/^[a-z].+@gmail.com/)]),
    address : new FormControl("",[Validators.required , Validators.pattern(/^[0-9]{1,5}\s[A-Za-z\s]{1,50},\s[A-Za-z\s]{1,50}$/)]),
    password : new FormControl("",[Validators.required , Validators.minLength(8)]),
    confirmPassword : new FormControl("",[Validators.required , Validators.minLength(8)]),
    phone : new FormControl("",[Validators.required , Validators.pattern(/^01[0|1|2|5][0-9]{8}$/)]),
  });
  get isValidFirstName(){
    return this.regValidation.controls.firstName.valid;
  }
  get isValidLastName(){
    return this.regValidation.controls.lastName.valid;
  }
  get isValidEmail(){
    return this.regValidation.controls.email.valid;
  }
  get isValidAddress(){
    return this.regValidation.controls.address.valid;
  }
  get isValidPassword(){
    return this.regValidation.controls.password.valid;
  }
  get isValidPhone(){
    return this.regValidation.controls.phone.valid;
  }

  signUp(){
    if(this.regValidation.valid){
      const userData:UserInterface = {
        id: uuid(), 
        name: `${this.regValidation.controls.firstName.value} ${this.regValidation.controls.lastName.value}`,
        email: this.regValidation.controls.email.value ?? "",
        address: this.regValidation.controls.address.value ?? "",
        gender: this.gender,
        password: this.regValidation.controls.password.value ?? "",
        phone: this.regValidation.controls.phone.value ?? "",
        favorites: [],
        cart: [],
        orders: [],
      };
  
      this.userService.setUser(userData).subscribe({
        next: (response) => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.log(error)
          alert("Sign up failed. Please try again.");
        },
      });
    }else{
      alert("Enter Valid Data");
    }
  }
}
