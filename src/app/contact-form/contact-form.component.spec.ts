import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ContactFormComponent, response } from './contact-form.component';
import { of } from 'rxjs';
import { SentStore} from '../store/contact.store';
import { MessageService } from "../../services/message.service"
import { ReactiveFormsModule } from '@angular/forms';
 
describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let service: MessageService;
  let store: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactFormComponent],
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
    // phone is null  
  })
  it("should have an api key", () => {
    expect(component.apiKey.length).toBeGreaterThan(5)
  })
  it("should have a regex block letters and allow numbers", () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    spyOn(event, 'preventDefault');
    component.allowPhoneCharacters(event); 
    expect(event.preventDefault).toHaveBeenCalled();

    const event2 = new KeyboardEvent('keydown', { key: '5' });
    spyOn(event2, 'preventDefault');
    expect(event2.preventDefault).not.toHaveBeenCalled();
  })
  it("should accept numbers only on pasted text", ()=>{
    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer()
    });
    event.clipboardData?.setData('text/plain', 'MY TELE 023');
    spyOn(event, 'preventDefault');
    component.onPastePhone(event);
    expect(event.preventDefault).toHaveBeenCalled();
  })
  describe("onSubmit", () => {
    const userFormDetails = { name: 'Richard', email: "back@mail.com", phone: '020 455 66', message: "Its good to see you guys are working on maps!" };
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
