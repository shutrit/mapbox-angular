import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapboxComponent } from './mapbox.component';
import { By } from '@angular/platform-browser';
import { SentStore } from '../store/contact.store';
import { MapboxService } from 'src/services/mapbox.service';

export class MapBoxGlMock  {
  accessToken="AG31410FYI91";
  container: any;
  style: any;
  center: any;
  zoom: any;
  flyTo(center: any, zoom: any, essential?: boolean) {
    return { center, zoom, essential };
  }
  on(event: string, callback: Function) {
    if (event === 'load') callback();
  }
  getCanvasContainer() {
    return {
      appendChild: () => {} 
    }
  }
  addLayer() {}
  getLayer() {}
  getSource() { }
  _addMarker() {}
  remove() {}
  addControl(mpGL:any) {
   return mpGL;  
  }
}


class MapboxServiceMock {
  createMap = jasmine.createSpy('createMap').and.returnValue(new MapBoxGlMock());
}

describe('MapboxComponent', () => {
  let component: MapboxComponent;
  let fixture: ComponentFixture<MapboxComponent>;
  let store: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SentStore, { provide: MapboxService, useClass: MapboxServiceMock }
],   
      declarations: [ MapboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapboxComponent);
    component = fixture.componentInstance;
    spyOn(component, 'addMarker').and.callFake(() => {});
    fixture.detectChanges();
    store = TestBed.inject(SentStore);

  });


    it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should have a rest view button", () => {
    const button: HTMLButtonElement = fixture.debugElement.query(By.css(".reset-button")).nativeElement;
    expect(button.textContent).toContain('reset');

  });
  it("should call flyTo method when signal sent is changed", () => {

    spyOn(MapBoxGlMock.prototype, 'flyTo').and.callThrough();
    fixture = TestBed.createComponent(MapboxComponent);
    expect(store.sent()).toBe(false);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.callflyTo();
    // setSent  
    store.setSent(true);
    expect(MapBoxGlMock.prototype.flyTo).toHaveBeenCalled();
    expect(store.sent()).toBe(true);
  });

});
