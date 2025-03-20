import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {


  supportForm: FormGroup;
  messageSent: string = '';

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      message: ['']
    });
  }

  sendMsg() {
    this.messageSent = "Thank you! Your message has been sent.";

    this.supportForm.reset();

    setTimeout(() => {
      this.messageSent = '';
    }, 3000);
  }
}
