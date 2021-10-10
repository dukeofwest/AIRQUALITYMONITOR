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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
      scriptUrl: '//cdn.matomo.cloud/airqualitymonitor.matomo.cloud/matomo.js',
      trackers: [
        {
          trackerUrl: 'https://airqualitymonitor.matomo.cloud/',
          siteId: 1
        }
      ],
      routeTracking: {
        enable: true
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
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
