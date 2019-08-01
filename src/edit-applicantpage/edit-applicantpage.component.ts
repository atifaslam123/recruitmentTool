import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicant.service'
import { Location } from '@angular/common';
import { SdToastService } from '@sdworx/sd-components';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-applicantpage',
  templateUrl: './edit-applicantpage.component.html',
  styleUrls: ['./edit-applicantpage.component.scss']
})
export class EditApplicantpageComponent implements OnInit {

  editApplicantForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  applicantID;
  emails=new Set();
  positionArray = ["Agile Coach", "Senior Software Engineer" , "Software Engineer", "IT Trainee"];
  departmentArray = [ "IT", "HR", "Operations"];
  positions: any[];
  submitted = false;

  constructor(public applicant: ApplicantService, public _location: Location, public sdToastService: SdToastService,  public activeModal: NgbActiveModal, public router: Router) { }

  submitData(Data){
    if (Data.email == "" || Data.first_name == "" || Data.last_name == "" )
    this.sdToastService.errorMessage('Please fill in the required fields');
    else {
      if(this.emails.has(Data.email)){
        if(Data.email == this.applicant.applicantProfile[0].email){
          this.submitted = true;
          this.applicant.updateApplicant(Data).subscribe(
            ()=> {
              this.sdToastService.successMessage('Applicant has been successfully updated');
              this.return();
            },
            error => {
              this.sdToastService.errorMessage('Error in updating applicant. Please try again!');
            }
          );
        }
        else{
          this.sdToastService.errorMessage('email is already associated to another account');
        }
      }

      else {
        this.submitted = true;
        this.applicant.updateApplicant(Data).subscribe(
            
          ()=> {
            this.sdToastService.successMessage('Applicant has been successfully updated');
            this.return();
          },
          error => {
            this.sdToastService.errorMessage('Error in updating applicant. Please try again!');
          }
        );
      }
    }
  }

  onSelectionChange(gender){
    this.applicant.changeGender(gender);
  }

  validatingForms() {
    this.editApplicantForm = new FormGroup({
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required)
      });
   /* [ Validators.required,
       Validators.pattern("[^ @]*@[^ @]*"),
      this.emailDomainValidator ]);*/
    }

  return(){
    this.activeModal.close();
    this.applicant.getApplicantProfile(this.applicantID);
    //this.applicant.getApplicantProfile(ID);
    
  }

  
  getAllEmails(){
    this.applicant.getApplicants().then(()=>{
    for(let x of this.applicant.applicants){
      this.emails.add(x.email);
      //console.log(x.ID);
    }
    for(let y of [this.emails]){
      console.log(y);
    }
  });
}

  ngOnInit() {
    
    this.submitted = false;
    this.applicant.getPositions().then(()=>this.positions =this.applicant.positions);

    this.validatingForms();
    Promise.resolve(null).then(() =>this.getAllEmails());
    this.applicantID = this.applicant.applicantID;
    console.log(this.applicantID);
    this.applicant.getTeams();
    
  }

}
