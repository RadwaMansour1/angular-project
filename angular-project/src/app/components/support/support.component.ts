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
  showError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required, Validators.pattern('^[01][0-9]{9}$')],
      message: ['', Validators.required]
    });
  }

  sendMsg() {
    if (this.supportForm.invalid) {
      this.showError = true;
      this.supportForm.markAllAsTouched();

      // this.messageSent= "All inputs are required.";
      return;
    }
    this.showError = false;
    this.messageSent = "Thank you! Your message has been sent.";

    this.supportForm.reset();

    setTimeout(() => {
      this.messageSent = '';
    }, 3000);
  }
}
