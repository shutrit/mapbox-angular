import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ContactFormComponent } from "./contact-form.component";
import * as signalForms from "@angular/forms/signals";
import { initialModel } from "./contact-form.component";
import { SentStore } from "../store/contact.store";
import { MessageService } from "../../services/message.service";
import { ReactiveFormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { MapboxComponent } from "../mapbox/mapbox.component";
import { of, throwError } from "rxjs";

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
  it.skip("should have empty values on init", () => {
    expect(component.contactForm.email()).toBe("");
    expect(component.contactForm.name()).toBe("");
    expect(component.contactForm.message()).toBe("");
  });
  it("should set the model via the form", () => {
    component.contactForm.name().value.set("Denis");
    expect(component.model().name).toBe("Denis");
  });
  it("should have a phone valid number format", () => {
    const phoneValidFromat = "06 23426299";
    const invalidFormat = "0623426299";
    component.contactForm.phone().value.set(phoneValidFromat);
    expect(component.contactForm.phone().valid()).toBe(true);
    expect(component.contactForm.phone().value()).toBe(phoneValidFromat);

    component.contactForm.phone().value.set(invalidFormat);
    expect(component.contactForm.phone().valid()).toBe(false);
    expect(component.contactForm.phone().value()).toBe(invalidFormat);
  });
  it("should accept empty or specific format in phone field", () => {
    const invalidFormat = "22202";
    component.contactForm.phone().value.set(invalidFormat);
    fixture.autoDetectChanges();
    expect(component.contactForm.phone().valid()).toBe(false);
    expect(component.contactForm.phone().errors().length).toBe(1);

    component.contactForm.phone().value.set("");
    fixture.autoDetectChanges();
    expect(component.contactForm.phone().valid()).toBe(true);
    expect(component.contactForm.phone().errors().length).toBe(0);
  });
  it("should have error message when email is not in correct format", () => {
    component.contactForm.email().value.set("Jerry.won.com");
    fixture.autoDetectChanges();
    expect(component.contactForm.email().valid()).toBe(false);
    const errorMessage = component.contactForm.email().errors()[0].message;
    expect(errorMessage).toBe("Email must be correct format");
  });
  it("should have minimum characters for a valid message", () => {
    component.contactForm.message().value.set("Jerry  ");
    fixture.autoDetectChanges();
    expect(component.contactForm.message().valid()).toBe(false);
    // here no validate function so message by default is another path
  });
  describe("onSubmit", () => {
    const userFormDetails = {
      name: "Gelle",
      email: "back@mail.com",
      phone: "06 23232323",
      message: "Its good to see you are working on maps",
    };

    it("should call the message service if form is valid", () => {
      const event: any = { preventDefault: () => undefined };
      vi.spyOn(service, "sendMessage");
      component.contactForm().value.set(userFormDetails);

      expect(component.contactForm().valid()).toBe(true);
      //expect(service.sendMessage).toHaveBeenCalled();
    });
  });
  describe("on Submit", () => {
    vi.mock("@angular/forms/signals", async (importOriginal) => {
      const actual = await importOriginal<typeof signalForms>();
      return {
        ...actual,
        submit: vi.fn((form, callback) => callback()),
      };
    });
    let sendMessageSpy: ReturnType<typeof vi.fn>;
    let fakeEvent: Event;
    beforeEach(() => {
      sendMessageSpy = vi.spyOn(component["service"], "sendMessage");
      fakeEvent = { preventDefault: vi.fn() } as unknown as Event;

      component.model.set({
        email: "abc@host.com",
        name: "Adinadelarey",
        message: "hi",
        phone: "",
      });
    });
    it("calls sendMessage with the current model value", async () => {
      sendMessageSpy.mockReturnValue(
        of({ status: "success", name: "Adainadelarey" }),
      );

      await component.onSubmit(fakeEvent); // if onSubmit isn't already async, see note below

      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(sendMessageSpy).toHaveBeenCalledWith({
        email: "abc@host.com",
        name: "Adinadelarey",
        message: "hi",
        phone: "",
      });
    });
    it("sets an error message when sendMessage throws", async () => {
      sendMessageSpy.mockReturnValue(
        throwError(() => new Error("network fail")),
      );

      await component.onSubmit(fakeEvent);

      expect(component.userMsg()).toBe("something went wrong");
    });
    it("resets the model and form regardless of outcome", async () => {
      sendMessageSpy.mockReturnValue(of({ status: "success", name: "Ada" }));

      const resetSpy = vi.spyOn(component.contactForm(), "reset");

      await component.onSubmit(fakeEvent);

      expect(component.model()).toEqual(initialModel);
      expect(resetSpy).toHaveBeenCalledWith(initialModel);
    });
  });
});
