import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-slider',
  imports: [CommonModule],
  templateUrl: './staff-slider.component.html',
  styleUrl: './staff-slider.component.css'
})
export class StaffSliderComponent {
  staffList =[
    {name: 'Ahmed Mohammed', image: '', position: 'Front-End Developer'},
    {name: 'Omar El Sayed', image: '', position: 'Front-End Developer'},
    {name: 'Radwa Mansour', image: '', position: 'Front-End Developer'},
    {name: 'Reem Ayman', image: '', position: 'Front-End Developer'},
    {name: 'Tadros Nasr', image: '', position: 'Front-End Developer'}
  ]
}
