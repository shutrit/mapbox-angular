import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { MapboxComponent } from "./mapbox/mapbox.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MessageService } from "../services/message.service";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ContactFormComponent, MapboxComponent],
      providers: [
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
