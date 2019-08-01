import { Component, OnInit, Input } from '@angular/core';
import { FormArray, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestprofileService } from '../services/testprofile.service';
import { TeamsService } from '../services/teams.service';
import { SdToastService } from '@sdworx/sd-components';

@Component({
  selector: 'app-edit-testprofile',
  templateUrl: './edit-testprofile.component.html',
  styleUrls: ['./edit-testprofile.component.scss']
})
export class EditTestprofileComponent implements OnInit {
  @Input() public testProfile;
  @Input() public testTeams;
  @Input() public testSegments;
  testProfileForm: FormGroup;
  difficulties: Array<number>;

  constructor(public activeModal: NgbActiveModal, public testProfileService: TestprofileService, public formBuilder: FormBuilder, public teamsService: TeamsService, public sdToast: SdToastService) {
    this.difficulties = [1, 2, 3, 4];
    this.teamsService.getTeams().then(() => this.teamsService.setDepartment(0));
    this.testProfileService.getCategories();
  }

  createForm() {
    this.testProfileForm = this.formBuilder.group({
      profile_name: [this.testProfile[0].profile_name, Validators.required],
      test_time: [this.testProfile[0].test_time, [Validators.required, Validators.pattern("^[0-9]*$")]],
      segments: this.formBuilder.array([], Validators.required),
      teams: this.formBuilder.array([])
    });
  }


  get segments(): FormArray {
    return this.testProfileForm.get('segments') as FormArray;
  }
  addSegment() {
    this.segments.push(this.formBuilder.group({
      ID: new FormControl(""),
      category_ID: new FormControl(""),
      difficulty: new FormControl(""),
      quantity: new FormControl("", Validators.pattern("^[0-9]*$")),
      testProfile_ID: new FormControl(this.testProfile[0].ID)
    }))
    //this.segments.push(this.formBuilder.group(new Segment()));
  }

  retrieveSegment(segment) {
    this.segments.push(this.formBuilder.group({
      ID: new FormControl(segment.ID),
      category_ID: new FormControl(segment.category_ID),
      difficulty: new FormControl(segment.difficulty),
      quantity: new FormControl(segment.quantity, Validators.pattern("^[0-9]*$")),
      testProfile_ID: new FormControl(segment.testProfile_ID)
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
            ID: new FormControl(this.teamsService.selectedSubdepartment.ID),
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
                ID: new FormControl(subdepartment.ID),
                department: new FormControl(this.teamsService.selectedDepartment),
                subDepartment: new FormControl(subdepartment.subdepartment),
              }))
            }
          }
        }
      }
      console.log(this.teams);

    }

    //this.segments.push(this.formBuilder.group(new Segment()));
  }

  retrieveTeams(teams) {
    this.teams.push(this.formBuilder.group({
      ID: new FormControl(teams.ID),
      department: new FormControl(teams.department),
      subDepartment: new FormControl(teams.subdepartment),
      teamTestProfile_ID : new FormControl(teams.teamTestProfile_ID)
    }))
  }

  updateTestProfile() {
    let correctSegments = true;
    for (let segment of this.segments.getRawValue()) {
      if (!segment.category_ID || !segment.difficulty || !segment.quantity) {
        correctSegments = false;
      }
    }
    //// THIS PART NEEDS CHANGING
    if (this.testProfileForm.valid && this.testProfileForm.value.teams.length != 0 && correctSegments) {


      this.testProfileService.updateTestProfile(this.testProfileForm.value.profile_name, this.testProfileForm.value.test_time);
      //this.testProfileService.updateTestSegments(this.testProfileForm.value.segments);
      this.testProfileService.updateTeams(this.testTeams,this.testProfileForm.value.teams, this.testProfile[0].ID);
      this.testProfileService.ChangeSegments(this.testSegments, this.testProfileForm.value.segments);
      console.log(this.testTeams);
      console.log(this.testProfileForm.value.teams);
      this.activeModal.close();

      console.log(this.testProfileForm);
    }
    else {
      this.sdToast.errorMessage("Please fill in all of the fields and select at least 1 team");
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
    for (let segment of this.testSegments) {
      this.retrieveSegment(segment);
    }
    for (let team of this.testTeams) {
      this.retrieveTeams(team);
    }
    console.log(this.testProfile[0].ID);
  }

}
