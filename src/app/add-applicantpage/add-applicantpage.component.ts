import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApplicantService } from '../services/applicant.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SdToastService } from '@sdworx/sd-components';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UploadService } from '../services/upload.service';
import { LoadingScreenService } from '../services/loading-screen.service';

@Component({
  selector: 'app-add-applicantpage',
  templateUrl: './add-applicantpage.component.html',
  styleUrls: ['./add-applicantpage.component.scss']
})
export class AddApplicantpageComponent implements OnInit {

  selectedGender;
  addApplicantForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  department: FormControl;
  position: FormControl;
  status: FormControl;
  notes: FormControl;
  cv: FormControl;
  gender : FormControl;
  emails=new Set();
  checked = false;
  cvFileValue="";
  submitted = false;
  searchText;
  M;
  F;
  O;
  

  positionArray = ["Agile Coach", "Senior Software Engineer" , "Software Engineer", "IT Trainee"];
  departmentArray = [ "IT", "HR", "Operations"];

  constructor(public loading:LoadingScreenService,public uploadservice: UploadService, public location: Location, public applicantService: ApplicantService, public sdToastService: SdToastService, public activeModal: NgbActiveModal, public router: Router) { }

  fileChangeEvent(fileInput: any)
  {
     this.cvFileValue = fileInput.target.files[0].name;
     console.log(this.cvFileValue);
     this.uploadservice.fileChangeEvent(fileInput);
  }

  submitData(applicantData) {
    
    //console.log(applicantData);

    if (applicantData.email == "" || applicantData.first_name == "" || applicantData.last_name == "" )
    this.sdToastService.errorMessage('Please fill in the required fields')
    else {

      if(this.emails.has(applicantData.email)){
        this.sdToastService.errorMessage('email is already associated to another account');
      }
      else{
        this.submitted = true;
        this.applicantService.postApplicant(applicantData,this.cvFileValue).subscribe(
          
          ()=> {
            this.sdToastService.successMessage('Applicant has been successfully added');
            this.return();
          },
          error => {
            this.sdToastService.errorMessage('Error in adding applicant. Please try again!');
          }
        );
      } 
    }
  }

  submitDataAnother(applicantData){
        console.log(applicantData);


        if (applicantData.email == "" || applicantData.first_name == "" || applicantData.last_name == "" )
        this.sdToastService.errorMessage('Please fill in the required fields')
        else {
    
          if(this.emails.has(applicantData.email)){
            this.sdToastService.errorMessage('email is already associated to another account');
          }
          else{
            this.applicantService.postApplicant(applicantData,this.cvFileValue).subscribe(
              
              ()=> {
                this.sdToastService.successMessage('Applicant has been successfully added');
                this.selectedGender = "";
                this.checked = false;
                
              },
              error => {
                this.sdToastService.errorMessage('Error in adding applicant. Please try again!');
              }
            );
          } 
        }

  }

  onSelectionChange(gender) {
    this.applicantService.changeGender(gender);
  }

  validatingForms() {
    this.addApplicantForm = new FormGroup({
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.email),
      'department': new FormControl(''),
      'position': new FormControl(''),
      'status': new FormControl(''),
      'notes': new FormControl(''),
      'cv' : new FormControl(''),
      'gender' : new FormControl('')
      });
   /* [ Validators.required,
       Validators.pattern("[^ @]*@[^ @]*"),
      this.emailDomainValidator ]);*/
    }

  /* emailDomainValidator(control: FormControl) {
    let email = control.value;
    if (email && email.indexOf("@") != -1) {
      let [_, domain] = email.split("@");
      if (domain !== "sdworx.com") {
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null;
  } */

  return() {
    this.activeModal.close();
    this.loading.startLoading();
    this.applicantService.getApplicants();

  }

  getAllEmails(){
    this.applicantService.getApplicants().then(()=>{
    for(let x of this.applicantService.applicants){
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
    this.applicantService.getPositions();
    Promise.resolve(null).then(() =>this.getAllEmails());
    this.validatingForms();
    this.applicantService.getTeams();
    this.loading.stopLoading();
  }
 

}
