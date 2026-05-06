// import { AppSettings }  from "../assets/settings";
import { AppSettings } from "./app-settings";

export const environment = {
  production: false,
  apiUrl: AppSettings.apiUrl,
  mapboxApiToken: AppSettings.map.apiToken,
  map: {
    style: "mapbox://styles/mapbox/streets-v12",
    logoPath: AppSettings.map.imgPath,
    defaultZoom: AppSettings.map.defaultZoom,
    defaultCenter: AppSettings.map.defaultCenter,
    markerPopupText: AppSettings.map.markerPopupText,
  },
  contact: {
    slogan: AppSettings.contact.slogan,
    phone: AppSettings.contact.phone,
    email: AppSettings.contact.email,
    address: AppSettings.contact.address,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
