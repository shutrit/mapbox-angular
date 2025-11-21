import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ContactFormComponent } from './contact-form.component';
import { response } from "../models/message.models";
import { of } from 'rxjs';
import { SentStore } from '../store/contact.store';
import { MessageService } from "../../services/message.service"
import { ReactiveFormsModule } from '@angular/forms';
import { phoneValidator } from '../models/validators';
import { MapboxComponent } from '../mapbox/mapbox.component';
 
describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let service: MessageService;
  let store: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactFormComponent, MapboxComponent],
      providers: [MessageService,SentStore,

        provideHttpClient(),
        provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MessageService);
    store = TestBed.inject(SentStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a form object", () => {
    expect(component.contactForm).toBeTruthy();
  })
  it("should have empty values on init", () => {
    expect(component.contactForm.value['email']).toBe("");
    expect(component.contactForm.value['name']).toBe("");
    expect(component.contactForm.value['message']).toBe("");  
  })
  it("should have an api key", () => {
    expect(component.apiKey.length).toBeGreaterThan(5)
  })
  it("should have a phone  valid number format", () => {
    const validator = phoneValidator(/^(?:\d{2}\s\d{8}|\d{3}\s\d{7})$/);

    const control = { value: '06 12345678' } as any;
    const result = validator(control);
  
    expect(result).toBeNull();   
  });
  it('should set phoneNumberInvalid error when phone is invalid', () => {
    const phoneControl = component.contactForm.get('phone') as any;
  
    phoneControl.setValue('123');   // invalid
    phoneControl.updateValueAndValidity();
  
    expect(phoneControl.hasError('phoneNumberInvalid')).toBeTrue();
  });
  it('should NOT set an error when phone is valid', () => {
    const phoneControl = component.contactForm.get('phone') as any;
    phoneControl.setValue('06 12345678'); // valid
    phoneControl.updateValueAndValidity();
    expect(phoneControl.hasError('phoneNumberInvalid')).toBeFalse();
    expect(phoneControl.valid).toBeTrue();
  });
  describe("onSubmit", () => {
    const userFormDetails = { name: 'Richard', email: "back@mail.com", phone: '020 4556688', message: "Its good to see you guys are working on maps!" };
    it("should not call the service if form is invalid", () => {
      expect(component.contactForm.valid).toBe(false);
      spyOn(service, "sendMessage");
      component.onSubmit();
      expect(service.sendMessage).not.toHaveBeenCalled();
    })
    it("should call the message service if form is valid", () => {
      component.ngOnInit();
      spyOn(service, 'sendMessage').and.returnValue(of({ message: 'success' }));
      component.contactForm.setValue(userFormDetails);
      component.onSubmit();

      expect(component.contactForm.valid).toBe(true);
      expect(service.sendMessage).toHaveBeenCalled();
    })
    it("should set sent to true when form is valid and response is success", () => {
    
      const response: response = { name: "somename", status: "success" };

      spyOn(component.contactForm, "reset");
      expect(store.sent()).toBe(false);
      spyOn(store, "setSent")
      spyOn(service, 'sendMessage').and.returnValue(of(response));

      component.contactForm.setValue(userFormDetails);
      component.onSubmit();

      expect(store.setSent).toHaveBeenCalledWith(true);
      expect(component.contactForm.reset).toHaveBeenCalled();      
    })
    it("should set sent to false when not sending form data", () => {
      spyOn(store, "setSent");
      spyOn(component.contactForm, "markAllAsTouched");
      
      component.contactForm.setValue({ name: "jerry", email: "notvalid.s", phone: "749 53", message: "ants84" });
      component.onSubmit();

      expect(store.setSent).toHaveBeenCalledWith(false);
      expect(component.contactForm.markAllAsTouched).toHaveBeenCalled();
   
    })
   })
});
