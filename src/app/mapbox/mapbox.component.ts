import { Component,ElementRef,inject,  Input,OnDestroy, OnInit, ViewChild, signal, Renderer2, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { isPlatformBrowser,  } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ConfigService } from '../config.service';

// TODO from config.json lat, lang
const INITIAL_CENTER: [number, number] =  [lat, lang];
const INITIAL_ZOOM = 13;

@Component({
  selector: 'app-mapbox',
  standalone:false,
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapboxComponent implements OnInit, OnDestroy{
  
  constructor(private config: ConfigService, private render:Renderer2){
    this.markerImgUrl = config.get('map').logoPath;
  }
  markerImgUrl:string;
  @Input() apiToken:string | undefined;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: any;
  private platformId = inject(PLATFORM_ID);
  private _shouldZoom:any;
  @Input()
  set mkZoom(value: boolean) {
  this._shouldZoom = value;
  }  
  get mkZoom():boolean {
  return this._shouldZoom;
  }
  center = signal<[number, number]>(INITIAL_CENTER);
  zoom = signal<number>(INITIAL_ZOOM);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mkZoom']) {
      if(changes['mkZoom'].currentValue === true) {
        this.map.flyTo({
          center: INITIAL_CENTER,
          zoom: 4,
          essential: true 
        })
      } 
    }
  }
  async ngOnInit () {
    if (isPlatformBrowser(this.platformId)) { // SSR check to ensure this runs in the browser as GL JS requires a browser environment
        const mapboxgl = (await import('mapbox-gl')).default      
        this.map = new mapboxgl.Map({
          accessToken: this.apiToken,
          container: this.mapContainer.nativeElement,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: this.center(),
          zoom: this.zoom()
      });
      this.map.on('load',()=>{
        const div = this.createDivMarker();
        const marker = new mapboxgl.Marker(div);
        marker.setLngLat(this.center())
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<p>Our location</p>`
            ))
        .addTo(this.map);
      });
      this.map.addControl(new mapboxgl.FullscreenControl());
      this.map.on('move', () => {
        const newCenter = this.map.getCenter();
        this.center.set([newCenter.lng, newCenter.lat]);
        this.zoom.set(this.map.getZoom());
      });
    }
  }
  resetView() {
    this.map.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      essential: true 
    });
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
  createDivMarker() {
       const el:HTMLElement = this.render.createElement('div');
       const width = 100;
       const height = 100;
       el.className = 'marker';
       el.style.width = `${width}px`;
       el.style.height = `${height}px`;
       el.style.backgroundColor = 'transparent';
       el.style.backgroundImage = `url(${this.markerImgUrl})`;
       el.style.backgroundRepeat = "no-repeat";
       el.style.backgroundSize ="90px 30px";
       return el;       
  }
}
