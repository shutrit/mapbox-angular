import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:true,
  imports:[CommonModule,  ContactFormComponent, ReactiveFormsModule ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-form-mapbox';
}
