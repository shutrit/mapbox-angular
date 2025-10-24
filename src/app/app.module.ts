import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateService } from './store/date.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { CommonModule } from '@angular/common';

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,   
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,    
  ],
  declarations: [
    AppComponent,
    ContactFormComponent,
    MapboxComponent
  ],
  exports:[],
  providers: [DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
