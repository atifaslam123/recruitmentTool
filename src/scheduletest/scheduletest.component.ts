import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduletestService } from '../services/scheduletest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SdToastService } from '@sdworx/sd-components';

@Component({
  selector: 'app-scheduletest',
  templateUrl: './scheduletest.component.html',
  styleUrls: ['./scheduletest.component.scss']
})
export class ScheduletestComponent {
  unClicked : boolean;
  constructor(  public scheduleTest : ScheduletestService,  public route:ActivatedRoute,public router:Router, public sdToastService: SdToastService,public activeModal: NgbActiveModal) {
    sessionStorage.removeItem("testProfileID");
    this.scheduleTest.getTestProfiles().then(()=>this.scheduleTest.getTeams()).then(()=>this.scheduleTest.setDepartment(0));
    this.scheduleTest.getplannedTests();
    this.scheduleTest.availableTests = [];
    this.unClicked= true;

   }
  onConfirmClick(): void {
    if(sessionStorage.getItem("testProfileID") && this.unClicked){
      this.unClicked=false;
      if(this.scheduleTest.plannedTests.length ==0){
        this.scheduleTest.createTest().subscribe();
        sessionStorage.removeItem("testProfileID");
        this.sdToastService.successMessage("Test has been scheduled");
        this.activeModal.close();
      }
      else{
        this.scheduleTest.deleteTest(this.scheduleTest.plannedTests[0].ID).subscribe(()=>this.scheduleTest.createTest().subscribe(
          ()=>{
            sessionStorage.removeItem("testProfileID");
            this.sdToastService.successMessage("Rescheduled test");
            this.activeModal.close();
          }
        ));
      }
    }
    if(this.unClicked==false){
      
    }
    else{ //fix 
      this.sdToastService.errorMessage("No test profile selected, please select one before proceeding");
    }
  }

}
