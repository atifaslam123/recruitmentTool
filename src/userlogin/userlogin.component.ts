import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AuthService } from '../services/auth.service';
import {Directive, AfterViewInit, OnDestroy, Input} from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { SdToastService } from '@sdworx/sd-components';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { TestService } from '../services/test.service';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  //authService: any;
  errorMessage;
  public loginGroup: FormGroup;

  constructor(public userlogin : UserloginService, public authService: AuthService, public fb:FormBuilder) { }
  //user login based on username
  // loginFields = this.fb.group({
  //   'username': new FormControl('', [Validators.required]),
  //   'password': new FormControl('', [Validators.required])
  // })
  // public user = this.loginGroup.get('username').value;
  // public pass = this.loginGroup.get('password').value;


  
 
  submit(username,password){
    //console.log(username);
    var userUsername = username.toLowerCase();
    //console.log(userUsername);
    var userPassword= password.toLowerCase();
    //console.log(userPassword);
    this.authService.getUser(userUsername,userPassword);
    
    
  }

  forget(username){
  //console.log(username);
  sessionStorage.setItem("username", JSON.stringify({"username": username}));
  sessionStorage.setItem("selectedUser", JSON.stringify({"role":"parashti"}));
  }
  
  

  ngOnInit() {
  }
  
}