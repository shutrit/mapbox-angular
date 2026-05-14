import { Component } from "@angular/core";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { MapboxComponent } from "./mapbox/mapbox.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [ContactFormComponent, CommonModule, ReactiveFormsModule],

  styleUrls: ["./app.component.scss"],
  standalone: true,
})
export class AppComponent {
  title = "contact-form-mapbox";
}
