import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RegisterRequest} from './app/model/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getAllTiket() {
    return this.http.get('http://localhost:8080/users');

  }

  saveTicket(registerRequest: RegisterRequest) {
    return this.http.post<any>('http://localhost:8080/users', registerRequest);
  }
}
