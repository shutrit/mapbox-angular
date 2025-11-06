import { Component,ElementRef,effect, inject,  Input,OnDestroy, OnInit, ViewChild,  Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser,  } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SentStore } from "../store/contact.store";
import  mapboxgl  from "mapbox-gl"
import { environment } from "../../environments/environment";
import { MapboxService } from 'src/services/mapbox.service';

@Component({
  selector: 'app-mapbox',
  standalone:false,
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapboxComponent implements OnInit, OnDestroy{
  private store = inject(SentStore);
  private platformId = inject(PLATFORM_ID);
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() apiToken:string | undefined;
  markerImgUrl!: string;
   map!: mapboxgl.Map; 
  center = this.store.initialCenter;
  zoom = this.store.initialZoom;
  

  constructor(private render:Renderer2, private mapBox: MapboxService){
    effect(()=>{
      const shouldZoom = this.store.sent(); 
      if (shouldZoom) {
        this.callflyTo(); 
      }
    });
  }

  callflyTo() {
    this.map.flyTo({
      center: this.store.initialCenter(),
      zoom: this.store.initialZoom(),
      essential: true 
    });
  }
  addMarker() {
    const div = this.createDivMarker();
    const marker = new mapboxgl.Marker(div);
    marker.setLngLat(this.center())
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<div><p>Helena van Doeverenplantsoen 3,Oude Centrum Den Haag</p></div>`
        ))
    .addTo(this.map);
  }

  async ngOnInit() {

    this.markerImgUrl = environment.map.logoPath;
    if (isPlatformBrowser(this.platformId)) { // SSR check to ensure this runs in the browser as GL JS requires a browser environment
          this.map = this.mapBox.createMap({
          accessToken: this.apiToken,
          container: this.mapContainer.nativeElement,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: this.center(),
          zoom: this.zoom()
        });
        this.map.on('load',()=>{
          this.addMarker();
      });
      this.map.addControl(new mapboxgl.FullscreenControl());
    }

  }
  resetView() {
    this.map.flyTo({
      center: this.store.initialCenter(),
      zoom: this.store.initialZoom(),
      essential: true 
    });
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  createDivMarker() {
       // Create a DOM element for makrer 
       const el:HTMLElement = this.render.createElement('div');
       const width = 140;
       const height = 50;
       el.className = 'marker';
       el.style.width = `${width}px`;
       el.style.height = `${height}px`;
       el.style.backgroundColor = 'transparent';
       el.style.backgroundImage = `url(${this.markerImgUrl})`;
       el.style.backgroundRepeat = "no-repeat";
       el.style.backgroundSize ="135px 45px";
       return el; 
      
  }
}