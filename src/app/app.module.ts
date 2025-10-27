import {  NgModule,  APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from './store/message.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';

export function initConfig(config: ConfigService) {
  return () => config.loadConfig();
}

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
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
