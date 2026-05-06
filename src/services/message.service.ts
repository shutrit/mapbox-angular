import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { eMessage, response } from "../app/models/message.models";
import { environment } from "../environments/environment";

const headers = new HttpHeaders({
  "Content-Type": "application/x-www-form-urlencoded",
});

@Injectable({ providedIn: "root" })
export class MessageService {
  constructor(private http: HttpClient) {}
  private readonly apiUrl = environment.apiUrl;
  sendMessage(msg: eMessage): Observable<response> {
    const body = new HttpParams()
      .set("email", msg.email)
      .set("name", msg.name)
      .set("message", msg.message);
    return this.http.post<response>(this.apiUrl, body.toString(), { headers });
  }
}
