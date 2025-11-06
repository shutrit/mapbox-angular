import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SentStore } from '../store/contact.store';
import { environment } from '../../environments/environment';
import { MessageService } from '../../services/message.service';
export interface eMessage {

  name:string;
  email:string;
  phone:string;
  message:string;
}

export interface response {
  status:string;
  name:string;
}
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  private store = inject(SentStore);
  contactForm: FormGroup;
  userMsg="";
  apiKey = "";
  constructor(private fb: FormBuilder, private service:MessageService) {
    // build the form group
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: [], // optional
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
       // PUBLIC MAPBOX TOKEN 
        this.apiKey = environment.mapboxApiToken;
   
  }
  allowPhoneCharacters(event: KeyboardEvent): void {
    const allowedRegex = /^[0-9\- ]$/; // single character allowed
    const inputChar = event.key;
  
    if (!allowedRegex.test(inputChar)) {
      event.preventDefault(); // block it
    }
  }

  onPastePhone(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') ?? '';
    const allowedPattern = /^[0-9\- ]*$/;
    if (!allowedPattern.test(pastedText)) {
      event.preventDefault();
    }
  }
  
  onSubmit() {
    if (this.contactForm.valid) {
      const formValue: eMessage = this.contactForm.value as eMessage;
      this.service.sendMessage(formValue).subscribe((res: response) => {
        if (res.status === 'success') {
          this.userMsg = `Thank you ${res.name}, your message has been sent.`;
          this.store.setSent(true);
          this.contactForm.reset();
        }    
      });

    } else {
      this.store.setSent(false);
      this.contactForm.markAllAsTouched();
    }
  }
}
