import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Idata } from './Idata';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  body: any;
 
  constructor(private http: HttpClient) { }

  register(body: any) {
    return this.http.post<Idata>('http://localhost:8080/users/register', body, {
    });
  }
  login(body: any) {
    return this.http.post<Idata>('http://localhost:8080/users/login', body) 
  }
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}