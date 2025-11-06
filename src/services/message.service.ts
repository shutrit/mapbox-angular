import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { eMessage } from '../app/contact-form/contact-form.component';
import { environment } from '../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })

@Injectable()

export class MessageService {
    apiUrl;
    constructor(private http:HttpClient) {
         this.apiUrl = environment.apiUrl
    }
    sendMessage(msg:eMessage):Observable<any> {
        const body = new HttpParams().set('email', msg.email).set('name', msg.name).set('message',msg.message);
        return this.http.post<any>(this.apiUrl, body.toString(), {headers})
    }
}
