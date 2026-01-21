import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { CommonModule} from '@angular/common';


@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,   
    BrowserAnimationsModule,
    CommonModule  
  ],
  exports:[],
  providers: [MessageService,   provideHttpClient()],

})
export class AppModule { }
