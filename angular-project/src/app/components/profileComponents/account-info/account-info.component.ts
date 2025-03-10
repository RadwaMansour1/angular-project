import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms"

@Component({
  selector: 'app-account-info',
  imports: [FormsModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
  firstName:string = "Ahmed";
  lastName:string = "Mostafa";
  email:string = "ahmed44@gmail.com";
  gender:string = "Male";

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
