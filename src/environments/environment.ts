import { AppConfig } from "../app/models/app.config.model";

export const environment: AppConfig = {
  production: false,
  apiUrl: "",
  mapboxApiToken: "",
  map: {
    style: "",
    logoPath: "",
    defaultZoom: 9,
    defaultCenter: [4.30809, 52.07185],
    markerPopupText: "",
  },
  contact: {
    slogan: "",
    phone: "",
    email: "",
    address: "",
  },
};
