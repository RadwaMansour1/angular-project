import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { UsersService } from '../../../services/users.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-info',
  imports: [FormsModule, RouterModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
  constructor(private userService: UsersService, private routetr: Router) {
    console.log(this.userService.user);
    this.firstName = this.userService.user.name.split(" ")[0];
    this.avatar = this.firstName[0].toUpperCase();
    this.lastName = this.userService.user.name.split(" ")[1];
    this.email = this.userService.user.email;
    this.gender = this.userService.user.gender;
  }

  firstName: string = "";
  avatar: string = "";
  lastName: string = "";
  email: string = "";
  gender: string = "";

  fnameChanged: boolean = false;
  lnameChanged: boolean = false;
  emailChanged: boolean = false;
  genderChanged: boolean = false;

  onFnameChange() {
    this.fnameChanged = true;
  }
  onLnameChange() {
    this.lnameChanged = true;
  }
  onEmailChange() {
    this.emailChanged = true;
  }
  onGenderChange() {
    this.genderChanged = true;
  }

  handleDelete() {
    const conf = confirm("Are you sure you want to delete your account?");
    if (conf)
      this.userService.deleteUser(this.userService.user.id).subscribe({
        next: () => {
          localStorage.removeItem("currentUser");
          this.routetr.navigate(["/login"]);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  handleLogOut() {
    localStorage.removeItem("currentUser");
    this.userService.user
    this.routetr.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  updateData(event: Event) {
    event.preventDefault();
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log(users);
        const indx = users.findIndex((u) => u.email === this.email);
        if (indx !== -1) {
          this.userService.updateUser(this.userService.user.id, {
            ...users[indx],
            name: `${this.firstName} ${this.lastName}`,
            email: this.email,
            gender: this.gender
          }).subscribe({
            next: (res) => {
              console.log(res);
              this.userService.user = res;
              console.log(this.userService.user);
              alert("Data Updated");
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
