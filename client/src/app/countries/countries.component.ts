import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any = [];

  constructor(
    private _countriesService: CountriesService
  ) { }

  ngOnInit() {
    this._countriesService.getCountries()
    .subscribe(
      res => this.countries = res,
      err => console.log(err)
    )
  }

}
