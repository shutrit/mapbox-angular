import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DateService } from '../store/date.service';
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
  sent = false;
  contactForm: FormGroup;
  userMsg="";
  apiKey = "pk.eyJ1Ijoic2FnczQwIiwiYSI6ImNtaDBiOWNqbDBlYnV2eHMyYTNqZ2F2MzAifQ.mJDbuzANX3AXdomY4o0MPA";
  constructor(private fb: FormBuilder, private service:DateService ) {
    // build the form group
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: [], // optional
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    console.log("Client compiled");
  }

  toggleSent() {
    console.log("sent:", this.sent);
    this.sent = !this.sent;
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
      this.service.sendMessage(formValue).subscribe((res:response)=>{
        console.log(res);
        if(res.status==='success') {
          this.userMsg = `Thank you ${res.name}, your ${res.status}`;
          // fire map event
          this.contactForm.reset();
        }    
      });

    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
