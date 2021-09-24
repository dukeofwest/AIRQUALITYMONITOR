import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _countriesUrl = "http://localhost:3000/api/countries";
  private _detailsUrl = "http://localhost:3000/api/details";

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.http.get<any>(this._countriesUrl)
  }

  getDetails() {
    return this.http.get<any>(this._detailsUrl)
  }
}
