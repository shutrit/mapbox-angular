// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://www.zommers.nl/service/.php",
  mapboxApiToken:"pk.eyJ1Ijoic2FnczQwIiwiYSI6ImNtaDBiOWNqbDBlYnV2eHMyYTNqZ2F2MzAifQ.mJDbuzANX3AXdomY4o0MPA",
  map: {
    style: "mapbox://styles/mapbox/streets-v12",
    logoPath:"https://zommers.nl/images/Logo20.png",
    defaultZoom: 9,
    defaultCenter: [4.30809, 52.07185]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
