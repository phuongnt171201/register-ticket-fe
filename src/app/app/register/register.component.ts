import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from '../model/registerRequest';

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

  constructor(private titleService: Title) {
    this.titleService.setTitle('Registration Info')

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
    let registerRequest: RegisterRequest = {
      name: this.f.name.value,
      address: this.f.address.value,
      cardId: this.f.cardId.value,
      doB: this.f.doB.value,
      typeClass: this.f.typeClass.value,
      payment: this.f.payment.value
    }
    console.log(registerRequest);

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
}
