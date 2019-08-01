import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { ApplicantService } from '../services/applicant.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ScheduletestService } from '../services/scheduletest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SdToastService } from '@sdworx/sd-components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduletestComponent } from '../scheduletest/scheduletest.component';
import { EditApplicantpageComponent } from '../edit-applicantpage/edit-applicantpage.component';

import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../model/user';


@Component({
  selector: 'app-applicantprofile',
  templateUrl: './applicantprofile.component.html',
  styleUrls: ['./applicantprofile.component.scss']
})

export class ApplicantprofileComponent implements OnInit {
 

  authUser:User = this.authService.currentUser;
  constructor(public sdToastService: SdToastService, public route: ActivatedRoute, public modalService: NgbModal,public applicant: ApplicantService, public test: TestService, public authService: AuthService, public scheduledTest : ScheduletestService ) { }

  question_ID: number;
  result: string;
  selectedTest= true;
  applicantID;

  ngOnInit() {
    this.applicant.selectedApplicant = [];
    this.applicant.selectedApplicant.push(JSON.parse(sessionStorage.getItem("applicantProfile")));
    this.applicantID = this.route.snapshot.paramMap.get('applicantID');
    this.setApplicantID();
    console.log("The applicant id on init is  : " + this.applicantID);
    this.applicant.getApplicantProfile(this.applicantID);
    this.applicant.getTests(this.applicantID);
  }

  open(){
    const modalRef = this.modalService.open(ScheduletestComponent, {size: 'lg', centered : true});
  }

  editApplicants(){
    const modalRef = this.modalService.open(EditApplicantpageComponent , {size: 'lg', centered : true});
  }

  question(testID: number){
    console.log("arrived");
    this.selectedTest = !this.selectedTest;
    this.test.question = [];
    this.test.testAnswers = [];
    this.test.getTestQuestion(testID);   
  }

  applicantAnswer(testID: number){
    this.test.getApplicantAnswer(testID);
  }

  answer(questionID: number){
    this.test.getAnswer(questionID);
    
  }

  testCorrect(question_ID: number){
    this.test.getResult(question_ID);
   
  }
  setApplicantID(){
    
      sessionStorage.setItem("applicantID",this.applicantID);
    
  }

  deleteTest(testID){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7c2855',
      cancelButtonColor: '#dc4405',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.scheduledTest.deleteTest(testID).subscribe( succes => this.sdToastService.successMessage("Test deleted"));
      }
    })
   
  }

}
