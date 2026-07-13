import { inject, Injectable, Signal } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { eMessage, response } from "../app/models/message.models";
import { environment } from "../environments/environment";

const headers = new HttpHeaders({
  "Content-Type": "application/x-www-form-urlencoded",
});

@Injectable({ providedIn: "root" })
export class MessageService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  sendMessage(msg: eMessage): Observable<response> {
    const body = new HttpParams()
      .set("email", msg.email)
      .set("name", msg.name)
      .set("message", msg.message);
    return this.http.post<response>(this.apiUrl, body.toString(), { headers });
  }
}
