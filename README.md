# AIRQUALITYMONITOR
An air quality monitoring application which makes it possible for everyone to check the air quality in their cities.
To run the project, run `npm run start`. This runs the server and client concurrently.
To build the project using Docker, change directory into client then run `docker-compose build airquality-service`.
Alternatively, from your project directory(client), run `docker-compose up` to build the app with the updated Compose file, and run it.


# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Testing pwa
To test pwa, run `ng build` and then `http-server -p 8080 -c-1 dist/client`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Frontend Architecture

![frontend-diagram](https://user-images.githubusercontent.com/18603431/137166703-bf3f9f98-c9e4-4e0d-96b6-cd86ae467dfb.png)

* The App component is a container using Router. It gets user token & user information from our browser’s Local Storage via auth.service. Then the navbar links for countries and details can then be displayed based on the user login state.
* Login component have a form for submission of data (with support of Form Validation). It uses the auth.service for sending login requests.
* auth.service uses Angular HttpClient ($http service) to make authentication requests.
* Countries and Details components will be displayed depending on login state from Local Storage. We use the countries.service to get protected resources from API.

## Backend Architecture

![beee](https://user-images.githubusercontent.com/18603431/137166751-408b5a83-073e-4fd0-9850-818481e9cc93.png)

* The Models is a container that contains the country json object and user object.
* The Routes container contains the api from which we connect to our db, as well as send our post request for login and get requests for countries and details properties.
* Our server uses express to serve our backend app on port 3000

