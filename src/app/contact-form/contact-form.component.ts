import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";

import { SentStore } from "../store/contact.store";
import { environment } from "../../environments/environment";
import { MessageService } from "../../services/message.service";
import { eMessage, response } from "../models/message.models";
import { EMAIL_PATTERN, PHONE_PATTERN } from "../models/validators";
import { CommonModule } from "@angular/common";
import { MapboxComponent } from "../mapbox/mapbox.component";
import {
  form,
  FormField,
  required,
  minLength,
  submit,
  validate,
} from "@angular/forms/signals";
import { firstValueFrom } from "rxjs";
import { InputFieldComponent } from "../shared/input-field/input-field";

export const initialModel = {
  name: "",
  email: "",
  phone: "",
  message: "",
};
@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  imports: [CommonModule, FormField, MapboxComponent, InputFieldComponent],
  styleUrl: "./contact-form.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private store: any = inject(SentStore);
  readonly service = inject(MessageService);
  readonly userMsg = signal("");

  errMsg = "This field is required";
  slogan = environment.contact.slogan;
  email = environment.contact.email;
  phoneNumber = environment.contact.phone;
  address = environment.map.markerPopupText;

  readonly model = signal<eMessage>(initialModel);

  readonly contactForm = form(this.model, (path) => {
    required(path.name, { message: "Name is required" });

    validate(path.phone, (ctx) => {
      const value = ctx.valueOf(path.phone);
      return PHONE_PATTERN.test(value) || value === ""
        ? undefined
        : { kind: "pattern", message: "Phone format incompatible" };
    });
    validate(path.email, (ctx) => {
      const value = ctx.valueOf(path.email);
      return EMAIL_PATTERN.test(value)
        ? undefined
        : { kind: "pattern", message: "Email must be correct format" };
    });
    validate(path.message, (ctx) => {
      const value = ctx.valueOf(path.message);
      return value.trim().length > 10
        ? undefined
        : {
            kind: "minimum length",
            message: "Minimum 10 characters is required",
          };
    });
    required(path.message, { message: "Message is required" });
    minLength(path.message, 10);
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.contactForm, async () => {
      const userMessage = this.model();
      try {
        const res = await firstValueFrom(this.service.sendMessage(userMessage));
        if (res?.status === "success") {
          this.userMsg.set(
            `Thank you ${res.name}, your message has been sent.`,
          );
          this.store.setSent(true);
        }
      } catch (error: any) {
        this.userMsg.set(error?.statusText || "something went wrong");
      } finally {
        this.model.set(initialModel);
        this.contactForm().reset(initialModel);
      }
    });
  }
}
