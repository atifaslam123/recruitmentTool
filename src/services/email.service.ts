import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from '../model/email';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  mail: Email;

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  sendEmail(mail: Email) {

    console.log('Mail: ' + JSON.stringify(mail));

    return this.http.post('http://recruitmenttoolwebapi.azurewebsites.net/api/sendMail', mail,  this.httpOptions);
  }
}
