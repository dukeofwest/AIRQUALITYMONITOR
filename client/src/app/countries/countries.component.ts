import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: any = [];

  constructor(
    private _countriesService: CountriesService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._countriesService.getCountries().subscribe(
      (res) => (this.countries = res),
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }

  fillCountriesArray() {
    for (let i = 1; i < 20; i++) {
      this.countries.push(i);
    }
  }

  onScroll() {
    const length = this.countries.length;
    setTimeout(() => {
      const p: any = ' '
        .repeat(20)
        .split('')
        .map((s, i) => i + 1 + length);
      while (p.length) this.countries.push(p.shift());
    }, 1000);
  }
}
