import { Component } from '@angular/core';
import { ProfileAsideComponent } from "../profile-aside/profile-aside.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ProfileAsideComponent, RouterModule],
  templateUrl: './profile.component.html',
  })

export class ProfileComponent {

}

