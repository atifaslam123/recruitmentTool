import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicant.service';
import { TestService } from '../services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditnotesComponent } from '../editnotes/editnotes.component';
import { PhasesApplicantpageComponent } from '../phases-applicantpage/phases-applicantpage.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import  Swal from 'sweetalert2';
import {formatDate } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {ExcelService} from '../services/excel.service';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../model/user';


import { AddApplicantpageComponent } from '../add-applicantpage/add-applicantpage.component';
import { LoadingScreenService } from '../services/loading-screen.service';

@Component({
  selector: 'app-applicantpage',
  templateUrl: './applicantpage.component.html',
  styleUrls: ['./applicantpage.component.scss']
})
export class ApplicantpageComponent implements OnInit {
  authUser:User = this.authService.currentUser;
  constructor(public loading: LoadingScreenService,public excelService:ExcelService, public applicant: ApplicantService, public testService: TestService, public router: Router, public modalService: NgbModal, public authService: AuthService) { }
  searchText;
  applicantID: number;
  filterChecked = this.applicant.checked;
  selectedId: any;
  selectedRow: number;
  hover=false;
  selectedIndex = -1;
  data: any;

  hovering(i){
    this.hover=true;
    this.selectedIndex = i;
    // console.log(this.hover);
  }

  notHovering(i){
    this.hover=false;
    this.selectedIndex= -1;
    // console.log(this.hover);
  }


  addApplicants(){
    const modalRef = this.modalService.open(AddApplicantpageComponent, {size: 'lg', centered : true});
   
  }

  applicantStatus(applicantID: any){

    this.applicant.getApplicantProfile(applicantID).then(()=>
    { 
      const modalRef = this.modalService.open(PhasesApplicantpageComponent, {size: 'lg', centered : true}); 
    })
  }

  details(applicantID: any) {
    let index = this.applicant.applicants.findIndex(res => res.ID === applicantID)
    this.selectedRow = index;
    this.applicant.getApplicantProfile(applicantID);
    return this.selectedRow;
  }


exportAsXLSX():void {
  this.data=this.applicant.filteredApplicants;
  for(let a of this.data){
    a.testResult = a.testResult*100;
  }
  this.excelService.exportAsExcelFile(this.data, 'Applicant List');
}

  test(applicantID: any) {
    //console.log("test applicantID is  : " + applicantID);
    //this.applicant.getTests(applicantID);
    this.router.navigate(['/applicantProfile/', applicantID]);
    //this.applicant.getTests(applicantID);
    //this.applicant.getTestQuestion(this.testID);
    this.testService.reset();
  }

  delete(ID: number) {
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
        let index = this.applicant.applicants.findIndex(res => res.ID === ID)
        this.applicant.deleteApplicant(ID, index);
      }
    })
   
  }

  updateNotes(applicant){
    const modalRef = this.modalService.open(EditnotesComponent, {size: 'lg', centered : true});
    modalRef.componentInstance.applicant = applicant;

  }

  phases(applicantID: number){
    this.router.navigate(['/phases/', applicantID]);
  
  }
  order(filter){
    switch(filter){
      case "testResult": this.applicant.filteredApplicants.sort((a,b) => {if(a.testResult!=null) {return  b.testResult-a.testResult}}); break;
      //case "dateTimeTaken": this.applicant.filteredApplicants.sort((a,b) => {if(a.dateTimeTaken!=null) {return a.dateTimeTaken.localeCompare(b.dateTimeTaken)}}).reverse(); break;
      case "dateAdded": this.applicant.filteredApplicants.sort((a,b) => {if(a.dateAdded!=null) {return a.dateAdded.localeCompare(b.dateAdded)}}).reverse(); break;
    }
  }

  ngOnInit() {
    //this.loading.startLoading();
    //this.applicant.getApplicants().then(()=>{this.data=this.applicant.applicants})
    this.applicant.getApplicants();

    sessionStorage.removeItem("applicantID");
  }
}
