import { TestBed } from "@angular/core/testing";
import { MapboxService } from "./mapbox.service";
import mapboxgl from "mapbox-gl";
import { environment } from "../environments/environment";

let service: MapboxService;

beforeEach(() => {
  TestBed.configureTestingModule({});
  service = TestBed.inject(MapboxService);
  vi.mock("mapbox-gl", () => ({
    default: {
      Map: vi.fn(class {}),
    },
  }));
});

it("should create", () => {
  expect(service).toBeTruthy();
});
it("should have mathod create", () => {
  const options = {} as mapboxgl.MapboxOptions;
  service.createMap(options);
  expect(options.accessToken).toBe(environment.mapboxApiToken);
  expect(options.style).toBe(environment.map.style);
  expect(mapboxgl.Map).toHaveBeenCalledWith(options);
});
