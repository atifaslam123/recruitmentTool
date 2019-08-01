import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Location } from '@angular/common';
import { SdToastService } from '@sdworx/sd-components';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { TestprofileService } from '../services/testprofile.service';

@Component({
  selector: 'app-edit-userpage',
  templateUrl: './edit-userpage.component.html',
  styleUrls: ['./edit-userpage.component.scss']
})
export class EditUserpageComponent implements OnInit {
  userID;
  editUserForm: FormGroup;
  position: FormControl;
  department: FormControl;
  subdepartment: FormControl;
  positionArray = ["Agile Coach", "Senior Software Engineer" , "Software Engineer", "IT Trainee"];
  departmentArray = [ "IT", "HR", "Operations"];
  positions: any;
  submitted = false;

  constructor(public user: UserService,  public testProfileService: TestprofileService, public formBuilder: FormBuilder, public teamsService: TeamsService, public _location: Location, public sdToastService: SdToastService, public activeModal: NgbActiveModal, public router: Router) 
  {this.teamsService.getTeams().then(() => this.teamsService.setDepartment(0));}
  submitData(Data){
    if (Data.department == "" || Data.position == "" || Data.role == ""   )
    this.sdToastService.errorMessage('Please fill in the required fields')
    else {
      this.submitted = true;
      this.user.updateUser(Data).subscribe(() => {
        this.sdToastService.successMessage('User has been successfully updated');
        this.return();
        this.user.getUserProfile(Data.ID);
      }, error => {
        this.sdToastService.errorMessage('Error in updating user. Please try again!');
      });   
      
    } 
  }

  
  validatingForms() {
    this.editUserForm = new FormGroup({
      'position': new FormControl('', Validators.required),
      'department': new FormControl('', Validators.required),
      'subdepartment': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required),
     // 'email': new FormControl('', Validators.required)
      });
    }
    get teams(): FormArray {
      return this.editUserForm.get('teams') as FormArray;
    }

    addTeams() {
      if (this.teamsService.selectedDepartment) {
        let includes = (this.editUserForm.controls.teams.value.filter(e => e.subDepartment === this.teamsService.selectedSubdepartment.subdepartment).length > 0);
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
              if (this.editUserForm.controls.teams.value.some(e => e.subDepartment === subdepartment.subdepartment)) { }
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
    return(){
      this.activeModal.close();
    }
  

  ngOnInit() {
    this.submitted = false;
    this.user.getPositions().then(()=>this.positions =this.user.positions);
    this.validatingForms();
    this.userID = this.user.userID;
     console.log('userID is : ' + this.userID);
  }

}
