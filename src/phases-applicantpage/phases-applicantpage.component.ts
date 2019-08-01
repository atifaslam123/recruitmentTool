import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { ApplicantService } from '../services/applicant.service'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingScreenService } from '../services/loading-screen.service';


@Component({
  selector: 'app-phases-applicantpage',
  templateUrl: './phases-applicantpage.component.html',
  styleUrls: ['./phases-applicantpage.component.scss']
})
export class PhasesApplicantpageComponent implements OnInit {

  constructor(public loading: LoadingScreenService,public applicant: ApplicantService, public activeModal: NgbActiveModal) { }

  statusApplicant: any[];
  phoneInterview: any[];
  firstInterview: any[];
  rejected: any[];
  recruited: any[];

  ngOnInit() {
    
    this.statusApplicant = [];
    this.firstInterview = [];
    this.phoneInterview = [];
    this.rejected = [];
    this.recruited = [];
  
    this.statusApplicant.push(JSON.parse(sessionStorage.getItem("applicantProfile")));
 

    if (this.statusApplicant[0].statusRecruitment == null) {
      console.log("No data")
    }
    else if (this.statusApplicant[0].statusRecruitment.toLowerCase() == "first interview") {
      this.firstInterview.push(this.statusApplicant[0]);
    }
    else if (this.statusApplicant[0].statusRecruitment.toLowerCase() == "phone interview") {
      this.phoneInterview.push(this.statusApplicant[0]);
    }
    else if (this.statusApplicant[0].statusRecruitment.toLowerCase() == "rejected") {
      this.rejected.push(this.statusApplicant[0]);    
    }
    else if (this.statusApplicant[0].statusRecruitment.toLowerCase() == "recruited") {
      this.recruited.push(this.statusApplicant[0]); 
    } 

  }

  drop(event: CdkDragDrop<any[]>, status) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.applicant.updateApplicantStatus(event.container.data, status);
    }
  }

  return(){
    this.activeModal.close();
    this.applicant.getApplicants();
    
  }

}
