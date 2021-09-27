import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData:any = {};

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/countries'])
        console.log(res)
      },
      err => console.log(err)     
    )
    console.log(this._authService.loginUser);
  }

}
