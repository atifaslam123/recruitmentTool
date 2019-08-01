import { Component, OnInit } from '@angular/core';
import { ApplicantloginService } from '../services/applicantlogin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicantinfo',
  templateUrl: './applicantinfo.component.html',
  styleUrls: ['./applicantinfo.component.scss']
})
export class ApplicantinfoComponent implements OnInit {

  applicant : any;
  ID : number
  email :string
  first_name:string
  gender:string
  last_name:string
  M;


  constructor(public applicantlogin : ApplicantloginService,  public route:ActivatedRoute,public router:Router, public fb: FormBuilder) {
    this.applicant = JSON.parse(sessionStorage.getItem("selectedApplicant"));
    this.data();
    this.applicantForm.setValue({first_name:this.first_name,last_name:this.last_name, email:this.email});

    //this.applicantForm.setValue({gender:this.gender});

  }

 applicantForm = this.fb.group({
    first_name: [],
    last_name: [],
    email: ["", Validators.email]
    //gender: []

  });

  //the data to be filled in in the form
  data(){
    this.ID = this.applicant.ID;
    this.email = this.applicant.email;
    this.first_name = this.applicant.first_name;
    this.gender = this.applicant.gender;
    this.last_name = this.applicant.last_name;
  }

  //edits the applicant data which has been filled in 
  //creates a test based on the current applicant's ID and the selected test profile 
   async startTest(applicantInfo){
    this.applicantlogin.startTest(applicantInfo);
  }

  ngOnInit() {
    this.checkStarted();
  }
  checkStarted(){
    if(sessionStorage.getItem("time") != null){
      sessionStorage.clear();
      this.router.navigateByUrl("/abort");
    }
  }

}
