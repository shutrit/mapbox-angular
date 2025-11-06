import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Injectable({ providedIn: 'root' })
export class MapboxService {
  createMap(options: mapboxgl.MapboxOptions): mapboxgl.Map {
    return new mapboxgl.Map(options);
  }
}