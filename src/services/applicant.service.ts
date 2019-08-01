import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Applicant } from '../model/applicant';
import { SdToastService } from '@sdworx/sd-components';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class ApplicantService {
  applicants: any[];
  applicantProfile: any[];
  selectedApplicant: any;
  applicantID: number;
  tests: any[];
  testQuestion: any[];
  testID: number;
  selectedGender: string;
  filteredApplicants: any[];
  checked = false;
  positions: any[];
  teams: any;
  departments: any;
  ID;

  constructor(public httpClient: HttpClient, public sdToastService: SdToastService, public router: Router) {
    this.applicants = [];
    this.applicantProfile = [];
    this.tests = [];
    this.testQuestion = [];
    this.filteredApplicants = [];
    this.selectedApplicant = [];

  }

  filter = {
    
    
    manager: false,
    softwareengineer: false,
    trainee: false,
  };

  // checkbox filtering and displaying when checked
  filterChange() {
    this.isChecked();
    if (this.checked) {
      this.filteredApplicants = this.applicants.filter(x =>

        
        // (x.position === 'Agile Coach' && this.filter.AgileCoach) ||
        (x.position === 'manager' && this.filter.manager) ||
        (x.position === 'software engineer' && this.filter.softwareengineer) ||
        (x.position === 'trainee' && this.filter.trainee)

      );
    }
    else {
      this.filteredApplicants = this.applicants;
    }

  }

  isChecked() {
    if (this.filter.manager ||
      this.filter.softwareengineer ||
      this.filter.trainee) {
      this.checked = true;
    }
    else {
      this.checked = false;

    }
  }

  getApplicants() {
    this.applicants = [];
    this.filteredApplicants = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant/').toPromise().then(res => {
        for (var key in res) {
          this.applicants.push(res[key]);
          this.filteredApplicants = this.applicants;
          //console.log(res[key]);
        }
        resolve();
      }));

    return promise;
  }

  getPositions() {
    this.positions = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/position/').toPromise().then(res => {
        for (var key in res) {
          this.positions.push(res[key]);
        }
        console.log(this.positions);
        resolve();
      }));
    return promise;
  }
  
  getTeams() {
    this.teams = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/team/').toPromise().then(res => {
        for (var key in res) {
          this.teams.push(res[key]);
        } resolve();
      }).then(() => this.getDepartments()));
    return promise;
  }
  
  getDepartments() {
    this.departments = [];
    for (let team of this.teams) {
      let contains = false;
      for (let department of this.departments) {

        if (department.department == team.department) {
          contains = true;
        }
      }
      if (contains == false) {
        this.departments.push(team);
        console.log(this.departments);
        console.log(team.department);
      }
    }
    this.departments.sort();
  }

  //gets the applicant's details from the database
  getApplicantProfile(applicantID) {
    this.selectedApplicant =
    this.applicantProfile = [];
    this.applicantID = applicantID;
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant/' + applicantID).toPromise().then(res => {
        for (var key in res) {
          this.applicantProfile.push(res[key]);
          //this.selectedApplicant.push(res[key]);
        }
        sessionStorage.setItem("applicantProfile", JSON.stringify(this.applicantProfile[0]));
        resolve()


      }));
    return promise;
  }

  //gets the applicant's test details from the database
  getTests(applicantID) {
    this.tests = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/test/' + applicantID).toPromise().then(res => {
        for (var key in res) {
          this.tests.push(res[key]);

        }
        resolve()
      }));
    return promise;
  }

  postApplicant(applicantData,cvFileValue) {

    var data = {
      dateAdded: new Date,
      first_name: applicantData.first_name,
      last_name: applicantData.last_name,
      gender: this.selectedGender,
      statusRecruitment: applicantData.status,
      position_ID: applicantData.position,
      department: applicantData.department,
      notes: applicantData.notes,
      cv: cvFileValue,
      email: applicantData.email
    }

    return this.httpClient.post<Applicant>('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant',
      JSON.stringify(data),
      httpOptions);
  }

  updateApplicant(applicantData) {

    var updatedGender;
    updatedGender = applicantData.gender;

    if (this.selectedGender != undefined) { updatedGender = this.selectedGender; }

    var data = {
      ID: applicantData.ID,
      first_name: applicantData.first_name,
      last_name: applicantData.last_name,
      gender: updatedGender,
      statusRecruitment: applicantData.status,
      position_ID: applicantData.position,
      department: applicantData.department,
      notes: applicantData.notes,
      cv: applicantData.cv,
      email: applicantData.email
    }

    return this.httpClient.put<Applicant>('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant/' + applicantData.ID,
      JSON.stringify(data),
      httpOptions)
  }

  deleteApplicant(applicantID: number, index: number) {
    this.filteredApplicants.splice(index, 1);
    return this.httpClient.delete<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant/' + applicantID,
      httpOptions).subscribe((response: Response) => {
        this.sdToastService.successMessage('Applicant has been successfully deleted');
      }, error => {
        this.sdToastService.errorMessage('Error in deleting applicant. Please try again!');
      });
  }

  updateApplicantStatus(applicantData, status) {

    var data = {
      ID: applicantData[0].ID,
      first_name: applicantData[0].first_name,
      last_name: applicantData[0].last_name,
      gender: applicantData[0].gender,
      statusRecruitment: status,
      position_ID: applicantData[0].position,
      department: applicantData[0].department,
      notes: applicantData[0].notes,
      cv: applicantData[0].cv,
      email: applicantData[0].email
    }
    
    return this.httpClient.put<Applicant>('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant/' + applicantData[0].ID,
      JSON.stringify(data),
      httpOptions).subscribe(() => {
        this.sdToastService.successMessage('Applicant has been successfully updated');
      }, error => {
        this.sdToastService.errorMessage('Error in updating applicant. Please try again!');
      });
  }

  changeGender(gender) {
    this.selectedGender = gender;
  }

}

