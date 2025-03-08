import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile-aside',
  imports: [RouterModule],
  templateUrl: './profile-aside.component.html',
  styleUrl: './profile-aside.component.css',
})
export class ProfileAsideComponent {
  isActive: boolean = false;


}
