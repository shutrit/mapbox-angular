import { AppSettings }  from "../assets/settings";
export const environment = {
  production: true,
  apiUrl: AppSettings.apiUrl,
  mapboxApiToken:AppSettings.map.apiToken,
  map: {
    style: "mapbox://styles/mapbox/streets-v12",
    logoPath:AppSettings.map.imgPath,
    defaultZoom: AppSettings.map.defaultZoom,
    defaultCenter: AppSettings.map.defaultCenter
  }
};
