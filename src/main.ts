import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { MessageService } from "./services/message.service";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), MessageService],
});
