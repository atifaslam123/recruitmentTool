import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Location } from '@angular/common';
import { SdToastService } from '@sdworx/sd-components';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/users';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http/';
import { AuthService } from '../services/auth.service';
import * as CryptoJS from 'crypto-js';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  userID;
  editUserPassword: FormGroup;
  oldpassword: FormControl;
  newpassword: FormControl;
  conpassword: FormControl;
  conversionOutput: string;
  userData: any;
  RegExp;
  submitted=false;
 

  constructor(public httpClient: HttpClient, public authService:  AuthService, public user: UserService, public _location: Location, public sdToastService: SdToastService, public activeModal: NgbActiveModal, public router: Router) {
    this.userData = JSON.parse(sessionStorage.getItem("selectedUser"));
   }
 
  submitData(Data){
    this.RegExp = new RegExp("^.{8,}$");

    if (Data.oldpassword == "" || Data.newpassword == "" || Data.conpassword == ""   )
    this.sdToastService.errorMessage('Please fill in the required fields')
    else {
      console.log(this.userID);
      this.decryptText(this.userData.passwd);
      if (this.conversionOutput === Data.oldpassword) {
        if (Data.newpassword !=  Data.conpassword)
          this.sdToastService.errorMessage('Passwords do not match')
          else if (!this.RegExp.test(Data.newpassword)){
            this.sdToastService.errorMessage('Password should consist of atleast 8 characters');
          }
          else{
            this.submitted= true;
            this.convertText(Data.newpassword);
            this.updateUsers(Data).subscribe(() => {
            this.sdToastService.successMessage('Your password has been successfully updated');
            this.return();
           
         this.user.getUserProfile(this.userID).then(
           ()=>{sessionStorage.setItem("selectedUser", JSON.stringify(this.user.userProfile[0]));}
         );
         
      }, error => {
        this.sdToastService.errorMessage('Error in updating password. Please try again!');
      });   
    }
    }
    else{
      this.sdToastService.errorMessage("Old password wrong!");
     }
    } 
  }
  decryptText(text:string) {
    this.conversionOutput = CryptoJS.AES.decrypt(text.trim(), "").toString(CryptoJS.enc.Utf8);
  } 
  convertText(text:string) {
    this.conversionOutput = CryptoJS.AES.encrypt(text.trim(), "").toString();
  } 
  updateUsers(Data) {
 
    var data = {
      ID: this.userID,
      username: this.userData.username,
      passwd: this.conversionOutput,
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      position: this.userData.position,
      department: this.userData.department,
      role: this.userData.role,
      email: this.userData.email
    }
  
    // console.log(data)
    // console.log(this.authService.userData)
    // console.log("password "+this.userData.passwd);
  
     return this.httpClient.put<User>('http://recruitmenttoolwebapi.azurewebsites.net/api/user/' + this.userID,
      JSON.stringify(data),
      httpOptions)
  }

  return(){
    //console.log("return: " + this.questionID);
    this.activeModal.close();
    //this.question.getQuestionProfile(this.questionID);
  }
  validatingForms() {
    this.editUserPassword = new FormGroup({
      'oldpassword': new FormControl('', Validators.required),
      'newpassword': new FormControl('', Validators.required),
      'conpassword': new FormControl('', Validators.required),
      });
    }

  ngOnInit() {
    this.submitted = false;
    this.validatingForms();
    
    this.userID = this.userData.ID;
    
  }

}
