import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CountriesComponent } from './countries/countries.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CountriesService } from './countries.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from "./token-interceptor.service";
import { MatomoModule } from "ngx-matomo";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CountriesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatomoModule.forRoot({
      scriptUrl: '//matomo.example.com/matomo.js',
      trackers: [
        {
          trackerUrl: 'http://matomo.example.com/matomo.php',
          siteId: 1
        }
      ],
      routeTracking: {
        enable: true
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    CountriesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
