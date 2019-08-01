import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Location } from '@angular/common';
import { SdToastService } from '@sdworx/sd-components';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http/';
import { User } from '../model/users';
import { AuthService } from '../services/auth.service';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-authuserprofile',
  templateUrl: './authuserprofile.component.html',
  styleUrls: ['./authuserprofile.component.scss']
})
export class AuthuserprofileComponent implements OnInit {

selectedUserForm: FormGroup;
// username: FormControl;
first_name: FormControl;
last_name: FormControl;
// email: FormControl;
userID: any;
userData: any;


  constructor(public modalService: NgbModal,  public httpClient: HttpClient,public user: UserService, public _location: Location, public sdToastService: SdToastService, public router: Router, public authService:  AuthService) {
    this.userData = JSON.parse(sessionStorage.getItem("selectedUser"));
   }

   editPassword(){
    const modalRef = this.modalService.open(EditPasswordComponent, {size: 'lg', centered : true});
  }

updateData(Data){
  if (Data.first_name == "" || Data.last_name == "" )
    this.sdToastService.errorMessage('Please fill in the required fields')
    else {
      
        this.updateUsers(Data).subscribe(() => {
          this.sdToastService.successMessage('User has been successfully updated');
          this.return();
          this.user.getUserProfile(Data.ID).then(
            ()=>{sessionStorage.setItem("selectedUser", JSON.stringify(this.user.userProfile[0]));}
          );
        }, error => {
          this.sdToastService.errorMessage('Error in updating user. Please try again!');
        });
      
       
    } 
}
return(){
 
}

updateUsers(Data) {
 
  var data = {
    ID: Data.ID,
    username: this.userData.username,
    passwd: this.userData.passwd,
    first_name: Data.first_name,
    last_name: Data.last_name,
    position: this.userData.position,
    department: this.userData.department,
    role: this.userData.role,
    email: this.userData.email
  }

  ;

   return this.httpClient.put<User>('http://recruitmenttoolwebapi.azurewebsites.net/api/user/' + Data.ID,
    JSON.stringify(data),
    httpOptions)
}
validatingForms() {
  this.selectedUserForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'first_name': new FormControl('', Validators.required),
    'last_name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.validatingForms();
    this.userID = this.userData.userID;
    console.log(sessionStorage.getItem("selectedUser"));
   
  }

}
