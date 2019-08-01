import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { TestprofileService } from '../services/testprofile.service';
import { Segment } from '../model/segment';
import { TeamsService } from '../services/teams.service';
import { SdToastService } from '@sdworx/sd-components';

@Component({
  selector: 'app-add-testprofile',
  templateUrl: './add-testprofile.component.html',
  styleUrls: ['./add-testprofile.component.scss']
})
export class AddTestprofileComponent implements OnInit {
  testProfileForm: FormGroup;
  difficulties: Array<number>;

  constructor(public activeModal: NgbActiveModal, public testProfileService: TestprofileService, public formBuilder: FormBuilder, public teamsService: TeamsService, public sdToast : SdToastService) {
    this.difficulties = [1, 2, 3, 4];
    this.testProfileService.getCategories();
    this.teamsService.getTeams().then(() => this.teamsService.setDepartment(0));
  }

  createForm() {
    this.testProfileForm = this.formBuilder.group({
      profile_name: ['', Validators.required],
      test_time: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      segments: this.formBuilder.array([],Validators.required),
      teams: this.formBuilder.array([])
    });
  }


  get segments(): FormArray {
    return this.testProfileForm.get('segments') as FormArray;
  }
  addSegment() {
    console.log(this.testProfileForm);

    this.segments.push(this.formBuilder.group({
      category_ID: new FormControl(""),
      difficulty: new FormControl(""),
      quantity: new FormControl("", Validators.pattern("^[0-9]*$"))
    }))
    //this.segments.push(this.formBuilder.group(new Segment()));
  }

  get teams(): FormArray {
    return this.testProfileForm.get('teams') as FormArray;
  }
  addTeams() {
    if (this.teamsService.selectedDepartment) {
      let includes = (this.testProfileForm.controls.teams.value.filter(e => e.subDepartment === this.teamsService.selectedSubdepartment.subdepartment).length > 0);
      if (!includes) {
        console.log(this.teamsService.selectedSubdepartment);
        if (this.teamsService.selectedSubdepartment && this.teamsService.selectedSubdepartment != 0) {
          this.teams.push(this.formBuilder.group({
            ID : new FormControl(this.teamsService.selectedSubdepartment.ID),
            department: new FormControl(this.teamsService.selectedDepartment),
            subDepartment: new FormControl(this.teamsService.selectedSubdepartment.subdepartment)
          }))
        }

        else {
          for (let subdepartment of this.teamsService.subdepartments) {
            if (this.testProfileForm.controls.teams.value.some(e => e.subDepartment === subdepartment.subdepartment)) { }
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
      console.log(this.teams);

    }

    //this.segments.push(this.formBuilder.group(new Segment()));
  }

  AddTestProfile() {
    let correctSegments = true;
    let doubleSegments =false;
    for(let segment of this.segments.getRawValue()){
      let containsSegment = this.segments.getRawValue().filter(item => item.category_ID ===segment.category_ID && item.difficulty ===segment.difficulty)
      if(containsSegment.length>1){
        doubleSegments =true;
      }
      if(!segment.category_ID || !segment.difficulty || !segment.quantity){
        correctSegments = false;
      }
    }

    
    if(this.testProfileForm.valid && this.testProfileForm.value.teams.length != 0 && correctSegments && doubleSegments ==false){
      this.testProfileService.createTestProfile(this.testProfileForm.value.profile_name, this.testProfileForm.value.test_time).subscribe(
        result=>{this.testProfileService.submitSegments(result, this.testProfileForm.value.segments);
        this.testProfileService.submitTeamTestProfiles(result[0].ID,this.testProfileForm.value.teams);
        this.activeModal.close();
        this.sdToast.successMessage("Test profile is being added");
        });
    }
    if(doubleSegments==false && correctSegments ==false){
      this.sdToast.errorMessage("Please fill in all of the fields and select at least 1 team");
    }
    if(doubleSegments){
      this.sdToast.errorMessage("Two segments have the same category and difficulty, please make sure all segments are unique");
    }

  }

  difficultyChange(value) {
    console.log(value);
  }

  removeDepartment(i: number) {
    this.teams.removeAt(i);
  }
  removeSegment(i: number) {
    this.segments.removeAt(i);
  }

  ngOnInit() {
    this.createForm();
  }


}
