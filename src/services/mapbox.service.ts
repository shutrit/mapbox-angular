import { Injectable } from "@angular/core";
import mapboxgl from "mapbox-gl";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class MapboxService {
  createMap(options: mapboxgl.MapboxOptions): mapboxgl.Map {
    options.accessToken = environment.mapboxApiToken;
    options.style = environment.map.style;
    return new mapboxgl.Map(options);
  }
}
