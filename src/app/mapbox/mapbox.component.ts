import { Component,ElementRef,inject,  Input,OnDestroy, OnInit,AfterViewInit, ViewChild, signal, Renderer2, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { isPlatformBrowser,  } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

const INITIAL_CENTER: [number, number] =  [4.30332, 52.07271];
const INITIAL_ZOOM = 13;
// studio [4.30332, 52.07271]
@Component({
  selector: 'app-mapbox',
  standalone:false,
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapboxComponent implements  AfterViewInit, OnInit, OnDestroy{
  @Input() apiToken:string | undefined;
  

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: any;
  private platformId = inject(PLATFORM_ID);
  
  private _shouldZoom:any;
  @Input()
  set mkZoom(value: boolean) {
    this._shouldZoom = value;
  }
  //  You cannot have @Input() on both getter and setter
 get mkZoom():boolean {
  return this._shouldZoom;
  }



  // for tool bar these vars should be signals but we are now on angular 15 
  center = signal<[number, number]>(INITIAL_CENTER);
  zoom = signal<number>(INITIAL_ZOOM);
  constructor(private render:Renderer2){}

  ngAfterViewInit(): void {
    console.log("Should zoom:",this._shouldZoom);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['mkZoom']) {
      console.log('Zoom changed:', changes['mkZoom'].currentValue);
      if(changes['mkZoom'].currentValue === true) {
        // this.zoom.set(4); // zooms out
        // this.map.setZoom(this.zoom()); // update map instance too
        this.map.flyTo({
          center: INITIAL_CENTER,
          zoom: 4,
          essential: true 
        })
      } 
    }
  }
  

  async ngOnInit () {
    console.log("My input is", this.apiToken);
    if (isPlatformBrowser(this.platformId)) { // SSR check to ensure this runs in the browser as GL JS requires a browser environment
        const mapboxgl = (await import('mapbox-gl')).default // dynamically import mapbox-gl as the default export
      
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
              `<p>Helena Van Scmuhgelenlaan 408, Den Haag</p>`
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
    console.log("on Destroy");
    if (this.map) {
      this.map.remove();
    }
  }

  createDivMarker() {
       // Create a DOM element for each marker.
       const el:HTMLElement = this.render.createElement('div');
       const width = 100;
       const height = 100;
       el.className = 'marker';
       el.style.width = `${width}px`;
       el.style.height = `${height}px`;
       el.style.backgroundColor = 'transparent';
       el.style.backgroundImage = "url('https://zommers.nl/images/Logo20.png')";
       el.style.backgroundRepeat = "no-repeat";
       el.style.backgroundSize ="90px 30px";
       return el; 
      
  }
}