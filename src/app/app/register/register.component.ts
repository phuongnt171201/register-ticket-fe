import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from '../model/registerRequest';
import {TicketService} from '../../ticket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  alert: any = {
    type: '',
    title: '',
    message: '',
    show: false
  };
  datePickerConfig;

  constructor(private titleService: Title, private ticketService: TicketService) {
    this.titleService.setTitle('Registration Info');

    this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl(''),
        cardId: new FormControl('', [Validators.required]),
        doB: new FormControl('', [Validators.required]),
        typeClass: new FormControl('', [Validators.required]),
        payment: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('invalid');
      this.alert.type = 'danger';
      this.alert.show = true;
      this.alert.title = 'Error';
      this.alert.message = 'Please fill out all needed fields.';
      return;
    }
    console.log('valid');
    this.calculatePayment(this.f.doB.value);
    let registerRequest: RegisterRequest = {
      name: this.f.name.value,
      address: this.f.address.value,
      cardId: this.f.cardId.value,
      doB: this.f.doB.value,
      typeClass: this.f.typeClass.value,
      payment: this.f.payment.value
    }
    console.log(registerRequest);
    this.ticketService.saveTicket(registerRequest)
      .subscribe(
        data => {
          console.log("data");
          console.log(data);
          this.alert.type = 'success';
          this.alert.show = true;
          this.alert.title = 'Success';
          this.alert.message = data;
        },
        error => {
          console.log(error);
          // this.error = error;
          this.alert.type = 'danger';
          this.alert.show = true;
          this.alert.title = 'Error';
          this.alert.message = error;
          // this.loading = false;
        }
      )
  }

  get f() {
    return this.registerForm.controls;
  }

  close(alert) {
    console.log('closing...');
    alert.show = false;
    if (alert.type === 'success'){
      // this.refreshPage();
      //TODO: load next page
    }
  }

  ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  calculatePayment(birthday) {
    if (this.registerForm.valid) {
      console.log("yes");
      let age = this.ageFromDateOfBirthday(birthday);
      let type = this.f.typeClass.value;
      if (age >= 7){
        if (type == "Ticket 3D"){
          this.f.payment.patchValue(200000);
        } else {
          this.f.payment.patchValue(100000);
        }

      } else {
        if (type == "Ticket 3D"){
          this.f.payment.patchValue(100000);
        } else {
          this.f.payment.patchValue(50000);
        }
      }
    }

  }
}
