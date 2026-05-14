import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MapboxComponent } from "./mapbox.component";
import { By } from "@angular/platform-browser";
import { SentStore } from "../store/contact.store";
import { MapboxService } from "../../services/mapbox.service";

export class MapBoxGlMock {
  accessToken = "AG31410FYI91";
  container: any;
  style: any;
  center: any;
  zoom: any;
  flyTo(center: any, zoom: any, essential?: boolean) {
    return { center, zoom, essential };
  }
  on(event: string, callback: Function) {
    if (event === "load") callback();
  }
  getCanvasContainer() {
    return {
      appendChild: () => {},
    };
  }
  addLayer() {}
  getLayer() {}
  getSource() {}
  _addMarker() {}
  remove() {}
  addControl(mpGL: any) {
    return mpGL;
  }
}

class MapboxServiceMock {
  createMap = vi.fn().mockReturnValue(new MapBoxGlMock());
}
describe("MapboxComponent", () => {
  let component: MapboxComponent;
  let fixture: ComponentFixture<MapboxComponent>;
  let store: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SentStore,
        { provide: MapboxService, useClass: MapboxServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapboxComponent);
    component = fixture.componentInstance;
    vi.spyOn(component, "addMarker").mockImplementation(() => {});
    fixture.detectChanges();
    store = TestBed.inject(SentStore);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have a rest view button", () => {
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css(".reset-button"),
    ).nativeElement;
    expect(button.textContent).toContain("reset");
  });
  it.skip("should call mapbox flyTo method when sent", () => {
    vi.spyOn(MapBoxGlMock.prototype, "flyTo");
    fixture = TestBed.createComponent(MapboxComponent);
    expect(store.sent()).toBe(false);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.flyToDefault();
    // setSent
    store.setSent(true);
    expect(MapBoxGlMock.prototype.flyTo).toHaveBeenCalled();
    // expect(store.sent()).toBe(true);
  });
});
