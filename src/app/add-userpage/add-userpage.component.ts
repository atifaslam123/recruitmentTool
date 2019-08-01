import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { TestprofileService } from '../services/testprofile.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SdToastService } from '@sdworx/sd-components';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { TeamsService } from '../services/teams.service';
import { container } from '@angular/core/src/render3';
@Component({
  selector: 'app-add-userpage',
  templateUrl: './add-userpage.component.html',
  styleUrls: ['./add-userpage.component.scss']
})
export class AddUserpageComponent implements OnInit {
  // textToConvert: string;
  //encryptedpassword: string;

  conversionOutput: string;
  textToConvert;

  addUserForm: FormGroup;
  username: FormControl;
  conpassword: FormControl;
   password;
  firstName: FormControl;
  lastName: FormControl;
  department: FormControl;
  subdepartment: FormControl;
  position: FormControl;
  role: FormControl;
  email: FormControl;
  submitted = false;
  positionArray = ["Agile Coach", "Senior Software Engineer" , "Software Engineer", "IT Trainee"];
  departmentArray = [ "IT", "HR", "Operations"];

  regexp;
  RegExp;
 
  constructor(public _location: Location, public user: UserService, public testProfileService: TestprofileService, public formBuilder: FormBuilder, public teamsService: TeamsService, public sdToastService: SdToastService, public activeModal: NgbActiveModal, public router: Router) {
     this.teamsService.getTeams().then(() => this.teamsService.setDepartment(0));}

    //  createForm() {
    //   this.addUserForm = this.formBuilder.group({
    //     teams: this.formBuilder.array([])
    //   });
    // }

  submitData(userData) {
    this.regexp = new RegExp("[^ @]*@sdworx.com[^ @]*");
    this.RegExp = new RegExp("^.{8,}$");
  
     if (userData.username == "" || userData.password == "" || userData.conpassword == ""   || userData.firstName == "" || userData.lastName == "" || userData.department == "" || userData.subdepartment == "" || userData.position == ""  || userData.role == ""  )
     {this.sdToastService.errorMessage('Please fill in the required fields')}

     else if(!this.regexp.test(userData.username) ){
      this.sdToastService.errorMessage('Enter the sdworx email of the user');
     }
     
     else if (!this.RegExp.test(userData.password)){
      this.sdToastService.errorMessage('Password should consist of atleast 8 characters');
    }
   
     
     else if (userData.password !=  userData.conpassword)
     this.sdToastService.errorMessage('Passwords do not match')


     else {
       this.submitted= true;
      this.convertText(userData.password);
      console.log(this.conversionOutput);
        // this.user.postUser(userData);
        // setTimeout(() => {
          
        //   //this.router.navigateByUrl("/questions");
        //   this.return();
        // }, 100);
        this.user.postUser(userData,this.conversionOutput).subscribe(
          ()=>{
            this.sdToastService.successMessage('User has been successfully added');
            this.return();
        }, 
        error => {
          this.sdToastService.errorMessage('Error in adding user. Please try again!');
        }, 
        );  
    } 
  }

  convertText(text:string) {
    this.conversionOutput = CryptoJS.AES.encrypt(text.trim(), "").toString();
  }  

  submitDataAnother(userData){

    this.regexp = new RegExp("[^ @]*@sdworx.com[^ @]*");
    this.RegExp = new RegExp("^.{8,}$");

    if (userData.username == "" || userData.password =="" || userData.conpassword ==""   || userData.firstName == "" || userData.lastName == "" || userData.department == "" || userData.subdepartment == "" || userData.position == ""  || userData.role == ""  )
     {this.sdToastService.errorMessage('Please fill in the required fields')}

   else if(!this.regexp.test(userData.username) ){
    this.sdToastService.errorMessage('Enter the sdworx email of the user');
   }

   else if (!this.RegExp.test(userData.password)){
    this.sdToastService.errorMessage('Password should consist of atleast 8 characters');
  }
    
    else if (userData.password !=  userData.conpassword)
    this.sdToastService.errorMessage('Passwords do not match')

    else {
      
      this.convertText(userData.password); 
      console.log(this.conversionOutput);
       this.user.postUser(userData,this.conversionOutput);
       

      this.user.postUser(userData,this.conversionOutput).subscribe(
        ()=>{
          this.sdToastService.successMessage('User has been successfully added');
           this.password =  "";
      }, 
      error => {
        this.sdToastService.errorMessage('Error in adding user. Please try again!');
      }, 
      );  
  }  
  }

  
  validatingForms() {
    this.addUserForm = new FormGroup({
      'username': new FormControl('',[
        Validators.required,
        Validators.pattern("[^ @]*@sdworx.com[^ @]*")
        
      ]),
      'password': new FormControl('', Validators.required),
      'conpassword': new FormControl('', Validators.required),
      // 'conpassword': new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'department': new FormControl('', Validators.required),
      'subdepartment': new FormControl('', Validators.required),
      'position': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required)
     /// 'email': new FormControl('', Validators.required)
      });
      
    }

    get teams(): FormArray {
      return this.addUserForm.get('teams') as FormArray;
    }
   
    addTeams() {
      if (this.teamsService.selectedDepartment) {
        let includes = (this.addUserForm.controls.teams.value.filter(e => e.subDepartment === this.teamsService.selectedSubdepartment.subdepartment).length > 0);
        if (!includes) {
          console.log(this.teamsService.selectedSubdepartment);
          if (this.teamsService.selectedSubdepartment && this.teamsService.selectedSubdepartment != 0) {
            this.teams.push(this.formBuilder.group({
              ID : new FormControl(this.teamsService.selectedSubdepartment.ID),
              department: new FormControl(this.teamsService.selectedDepartment),
              subDepartment: new FormControl(this.teamsService.selectedSubdepartment.subdepartment)
            }
            ))
          }
  
          else {
            for (let subdepartment of this.teamsService.subdepartments) {
              if (this.addUserForm.controls.teams.value.some(e => e.subDepartment === subdepartment.subdepartment)) { }
              else {
                console.log(subdepartment);
                this.teams.push(this.formBuilder.group({
                  ID : new FormControl(subdepartment.ID),
                  department: new FormControl(this.teamsService.selectedDepartment),
                  subDepartment: new FormControl(subdepartment.subdepartment)
                }))
              }
            }
          }
        }
        // console.log(this.teams);
  
      }
  
      //this.segments.push(this.formBuilder.group(new Segment()));
    }

    return() {
      this.activeModal.close();
      this.user.getUsers();
  
    }
  
    ngOnInit() {
      this.submitted=false;
      this.user.getPositions();
      this.validatingForms();
      Promise.resolve(null).then(()=>this.user.getUsers());
    }

}         
