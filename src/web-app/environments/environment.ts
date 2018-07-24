// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://172.21.190.115:8081/',
  AGM_API_URL: '',
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiYnJhbWJsZXlzIiwiYSI6ImNqam82cmIyZjIzcWozcW0wdjh6enB4Y3kifQ.udssCP8HoCZCKddR4FF8FA'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
