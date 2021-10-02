import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData:any = {};

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private readonly matomoTracker: MatomoTracker
  ) { }

  ngOnInit(): void {
    this.matomoTracker.setUserId('UserId')
    this.matomoTracker.setDocumentTitle('login')
  }

  loginUser() {
    console.log('click matomo');
    this.matomoTracker.trackEvent('Login', 'Login Button Pressed', 'click login');
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/details'])
      },
      err => console.log(err)     
    )
  }

}
