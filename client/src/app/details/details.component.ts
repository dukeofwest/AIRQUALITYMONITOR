import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details: any = [];

  constructor(
    private _countriesService: CountriesService,
    private _router: Router,
    private readonly matomoTracker: MatomoTracker
  ) { }

  ngOnInit() {
    console.log('click details');
    this.matomoTracker.trackEvent('details', 'details link Pressed', 'click details');
    this._countriesService.getDetails()
    .subscribe(
      res => this.details = res,
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
