export interface AppConfig {
  production: boolean;
  apiUrl: string;
  mapboxApiToken: string;
  map: {
    style: string;
    logoPath: string;
    defaultZoom: number;
    defaultCenter: any;
    markerPopupText: string;
  };
  contact: {
    slogan: string;
    phone: string;
    email: string;
    address: string;
  };
}
