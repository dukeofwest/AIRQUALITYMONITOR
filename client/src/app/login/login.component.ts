import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { MatomoTracker } from 'ngx-matomo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern('[a-zA-Z0-9._ ]*')
      ])
  })

  loginUserData:any = {};

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private readonly matomoTracker: MatomoTracker
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  loginUser() {
    console.log('click matomo');
    console.warn(this.loginForm.value)
    this.matomoTracker.trackEvent('login', 'login button pressed', 'click login');
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/countries'])
      },
      err => console.log(err)     
    )
  }

}
