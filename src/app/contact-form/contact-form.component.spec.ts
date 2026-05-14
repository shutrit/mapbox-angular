import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ContactFormComponent } from "./contact-form.component";
import { response } from "../models/message.models";
import { of } from "rxjs";
import { SentStore } from "../store/contact.store";
import { MessageService } from "../../services/message.service";
import { ReactiveFormsModule } from "@angular/forms";
import { phoneValidator } from "../models/validators";
import { Component } from "@angular/core";
import { MapboxComponent } from "../mapbox/mapbox.component";

@Component({
  selector: "app-mapbox",
  template: "",
  standalone: true,
})
class MockMapboxComponent {}

describe("ContactFormComponent", () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let service: MessageService;
  let store: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ContactFormComponent],
      providers: [
        MessageService,
        SentStore,

        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(ContactFormComponent, {
        remove: {
          imports: [MapboxComponent],
        },
        add: {
          imports: [MockMapboxComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MessageService);
    store = TestBed.inject(SentStore);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a form object", () => {
    expect(component.contactForm).toBeTruthy();
  });
  it("should have empty values on init", () => {
    expect(component.contactForm.value["email"]).toBe("");
    expect(component.contactForm.value["name"]).toBe("");
    expect(component.contactForm.value["message"]).toBe("");
  });

  it("should have a phone  valid number format", () => {
    const validator = phoneValidator(/^(?:\d{2}\s\d{8}|\d{3}\s\d{7})$/);

    const control = { value: "06 23426299" } as any;
    const result = validator(control);

    expect(result).toBeNull();
  });
  it("should set phoneNumberInvalid error when phone is invalid", () => {
    const phoneControl = component.contactForm.get("phone") as any;

    phoneControl.setValue("123"); // invalid
    phoneControl.updateValueAndValidity();

    expect(phoneControl.hasError("phoneNumberInvalid")).toBe(true);
  });
  it("should NOT set an error when phone is valid", () => {
    const phoneControl = component.contactForm.get("phone") as any;
    phoneControl.setValue("06 12345678"); // valid
    phoneControl.updateValueAndValidity();
    expect(phoneControl.hasError("phoneNumberInvalid")).toBe(false);
    expect(phoneControl.valid).toBe(true);
  });
  describe("onSubmit", () => {
    const userFormDetails = {
      name: "Gelle",
      email: "back@mail.com",
      phone: "06 23232323",
      message: "Its good to see you are working on maps",
    };
    it("should not call the service if form is invalid", () => {
      expect(component.contactForm.valid).toBe(false);
      vi.spyOn(service, "sendMessage");
      component.onSubmit();
      expect(service.sendMessage).not.toHaveBeenCalled();
    });
    it("should call the message service if form is valid", () => {
      component.ngOnInit();
      vi.spyOn(service, "sendMessage").mockReturnValue(
        of({ status: "success", name: "name" }),
      );
      component.contactForm.setValue(userFormDetails);
      component.onSubmit();
      console.log(component.contactForm.valid);
      //expect(component.contactForm.valid).toBe(true);
      expect(service.sendMessage).toHaveBeenCalled();
    });
    it("should set sent true when form is valid and response is success", () => {
      const response: response = { name: "somename", status: "success" };

      vi.spyOn(component.contactForm, "reset");
      expect(store.sent()).toBe(false);
      vi.spyOn(store, "setSent");
      vi.spyOn(service, "sendMessage").mockReturnValue(of(response));

      component.contactForm.setValue(userFormDetails);
      component.onSubmit();

      expect(store.setSent).toHaveBeenCalledWith(true);
      expect(component.contactForm.reset).toHaveBeenCalled();
    });
    it("should set sent false when form is invalid", () => {
      const store = TestBed.inject(SentStore);
      vi.spyOn(store, "setSent");
      vi.spyOn(component.contactForm, "markAllAsTouched");

      component.contactForm.setValue({
        name: "",
        email: "notvalid.s",
        phone: "749 53",
        message: "ants84",
      });

      component.onSubmit();

      expect(store.setSent).toHaveBeenCalledWith(false);
      expect(component.contactForm.markAllAsTouched).toHaveBeenCalled();
    });
  });
});
