//Contains methods related to login and registration

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

interface tokenAuth {
  token: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  registerUser(user:any):Observable<any> {
    return this.http.post(this._registerUrl, user)
  }

  loginUser(user:any):Observable<any> {
    return this.http.post(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
