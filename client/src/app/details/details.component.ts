import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details = []

  constructor(
    private _countriesService: CountriesService
  ) { }

  ngOnInit() {
    this._countriesService.getDetails()
    .subscribe(
      res => this.details = res,
      err => console.log(err)
    )
  }

}
