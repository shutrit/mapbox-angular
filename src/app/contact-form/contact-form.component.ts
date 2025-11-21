import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SentStore } from '../store/contact.store';
import { environment } from '../../environments/environment';
import { MessageService } from '../../services/message.service';
import { eMessage, response } from '../models/message.models';
import { phoneValidator } from '../models/validators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  private store = inject(SentStore);
  contactForm: FormGroup;
  userMsg = "";
  apiKey = "";
  errMsg = " This field is required";

  constructor(private fb: FormBuilder, private service:MessageService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: ['',[phoneValidator(/^(?:\d{2}\s\d{8}|\d{3}\s\d{7})$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
        this.apiKey = environment.mapboxApiToken; 
  }

  get phone() {
    return this.contactForm.get('phone');
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
