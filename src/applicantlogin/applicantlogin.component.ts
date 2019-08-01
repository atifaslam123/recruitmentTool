import { Component, OnInit } from '@angular/core';
import { ApplicantloginService } from '../services/applicantlogin.service';

@Component({
  selector: 'app-applicantlogin',
  templateUrl: './applicantlogin.component.html',
  styleUrls: ['./applicantlogin.component.scss']
})
export class ApplicantloginComponent implements OnInit {

  constructor( public applicantlogin : ApplicantloginService) { }
  //applicant login based on email address
  submit(email){
    var applicantEmail = email.toLowerCase();
    this.applicantlogin.getApplicant(applicantEmail).then(()=>this.applicantlogin.getTest());
  }
  ngOnInit() {
    sessionStorage.removeItem("selectedApplicant");
    sessionStorage.removeItem("test");

  }

}
