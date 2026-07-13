import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { MessageService } from "./services/message.service";
import { provideSignalFormsConfig } from "@angular/forms/signals";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    MessageService,
    provideSignalFormsConfig({
      classes: {
        invalid: (ctrl) => ctrl.state().invalid() && ctrl.state().dirty(),
        touched: (ctrl) => ctrl.state().touched(),
        "marked-invalid": (ctrl) =>
          ctrl.state().invalid() && ctrl.state().touched(),
      },
    }),
  ],
});
