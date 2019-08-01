import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http/';
import { SdToastService } from '@sdworx/sd-components';
import * as CryptoJS from 'crypto-js';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  filteredUsers: any[];
  users: any[];
  username: any[];

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUser(): User {
    let currentUser = JSON.parse(sessionStorage.getItem("selectedUser"));
    let user: User = new User(currentUser.role);
    return user;
  }


  constructor(public router: Router, public httpClient: HttpClient, public sdToastService: SdToastService) {
    this.users = [];
    this.filteredUsers = [];
    this.username = [];
  }
  conversionOutput: string;
  userData: any[];

  getUser(username, password) {

    let params = new HttpParams().set('username', username);
    //.set('passwd', password);
    let user = [];
    this.userData = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/login/', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params: params
      }).toPromise().then(res => {
        for (var key in res) {
          user.push(res[key]);

        }

        switch (user.length) {
          case 0: {
            if ((username == "" && password == "") || (username == "" || password == "")) {
              this.sdToastService.errorMessage("Fields cannot be blank!!");
            }
            else {
              this.sdToastService.errorMessage("Incorrect Account Credentials");
            }
            break;
          }


          case 1: {
            this.userData = user[0];
            this.decryptText(user[0].passwd);

            if (this.conversionOutput === password) {

              sessionStorage.setItem("selectedUser", JSON.stringify(user[0]));
              this.adminCheck();
              this.sdToastService.successMessage("Welcome  " + user[0].username);
            } else {
              this.sdToastService.errorMessage("Incorrect Account Credentials");
            }
            break;
          }

          default: {

            this.sdToastService.errorMessage("Several records of this account, please contact the test administrator");
            break;
          }
        }
      }));
    return promise;
  }
  getUsers() {
    this.users = [];
    this.filteredUsers = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/user/').toPromise().then(res => {
        for (var key in res) {
          this.users.push(res[key]);
          // this.filteredUsers.push(res[key]);
          this.filteredUsers = this.users;
        }
        //console.log(this.users);
        resolve();

      }));
    return promise;
  }

  decryptText(text: string) {
    this.conversionOutput = CryptoJS.AES.decrypt(text.trim(), "").toString(CryptoJS.enc.Utf8);
  }

  login() {
    this.loggedIn.next(true);
    this.router.navigate(['/applicants']);

  }
  adminCheck() {
    var selectedUser = JSON.parse(sessionStorage.getItem("selectedUser"));
    if (selectedUser.role == "Team Leader") {
      this.router.navigate(['/questions']);
    } else {
      this.login();
    }
  }

  getUsername(username) {
    this.username = username;
    return this.username;
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
    sessionStorage.clear();
  }


}

