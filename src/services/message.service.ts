import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eMessage } from '../app/models/message.models';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })

@Injectable()

export class MessageService {
    apiUrl;
     private http = inject(HttpClient);
    constructor() {
        
         this.apiUrl = environment.apiUrl
    }
    sendMessage(msg:eMessage):Observable<any> {
        const body = new HttpParams().set('email', msg.email).set('name', msg.name).set('message',msg.message);
        return this.http.post<any>(this.apiUrl, body.toString(), {headers})
    }
}