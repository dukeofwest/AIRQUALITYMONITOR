import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl = 'http://localhost:3000/api'

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.http.get<any>(`${this.baseUrl}/countries`)
  }

  getDetails(id:string) {
    return this.http.get<any>(`${this.baseUrl}/details/${id}`)
  }
}
