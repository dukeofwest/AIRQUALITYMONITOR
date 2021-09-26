import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData:any = {}

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        //localStorage.setItem('token', res.token)
        console.log(res)
      },
      err => console.log(err)     
    )
    console.log(this._auth.registerUser);
  }
}
