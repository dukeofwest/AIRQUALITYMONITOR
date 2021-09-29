import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any = [];

  constructor(
    private _countriesService: CountriesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._countriesService.getCountries()
    .subscribe(
      res => this.countries = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

}
