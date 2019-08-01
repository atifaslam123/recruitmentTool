import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ScheduletestService {

  tests: any[];
  applicants: any[];
  testID: number;
  teams: any[];
  departments: any[];
  selectedSubdepartment: number;
  selectedDepartment: number;
  subdepartments: any[];
  availableTests: any[];
  plannedTests: any[];

  constructor(public httpClient: HttpClient) {
    this.tests = [];
    this.applicants = [];
    this.testID = null;
    this.teams = [];
    this.departments = [];
    this.subdepartments = [];
    this.selectedSubdepartment = null;
    this.selectedDepartment = null;
    this.availableTests = [];
  }

  //gets all of the tests from the database 
  getTestProfiles() {
    this.tests = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/teamTestProfile/').toPromise().then(res => {
        for (var key in res) {
          this.tests.push(res[key]);
        } resolve();
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

  getplannedTests() {
    this.plannedTests =[];
    let applicantID = JSON.parse(sessionStorage.getItem("applicantID"));
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/test/'+applicantID).toPromise().then(res => {
        for (var key in res) {
          if(res[key].dateTimeTaken == null){
            this.plannedTests.push(res[key]);
          }
          
        }  resolve();
      }));
    return promise;
  }

  getDepartments() {
    for (let team of this.teams) {
      let contains = false;
      for (let department of this.departments) {

        if (department.department == team.department) {
          contains = true;
        }
      }
      if (contains == false) {
        this.departments.push(team);
      }
    }
    this.departments.sort();
  }


  setDepartment(department) {
    this.availableTests = [];
    let availableTests = [];
    this.subdepartments = [];
    this.selectedDepartment = department;
    this.selectedSubdepartment = 0;


    for (let test of this.tests) {
      if (this.selectedDepartment == 0) {
        if (availableTests.some(e => e.ID === test.ID)) { }
        else {
          availableTests.push(test);
        }
        this.setAvailableTests(availableTests);
      }
      else {
        if (test.team_ID == this.selectedSubdepartment) {
          availableTests.push(test);
        }
        this.setSubdepartment(0);
      }
    }

    for (let team of this.teams) {
      if (team.department == department) {
        this.subdepartments.push(team);
      }
      this.subdepartments.sort();
    }
  }


  setSubdepartment(subdepartment) {
    let availableTests = [];
    this.selectedSubdepartment = subdepartment;
    for (let test of this.tests) {
      if (this.selectedSubdepartment == 0 && test.department == this.selectedDepartment) {
        if (availableTests.some(e => e.ID === test.ID)) { }
        else {
          availableTests.push(test);
        }
      }
      if (test.team_ID == this.selectedSubdepartment) {
        availableTests.push(test);
      }
    }
    this.setAvailableTests(availableTests);
  }
  setAvailableTests(y) {
    this.availableTests = [];
    for (let x of y) {
      this.availableTests.push(x);
    }
  }

  createTest() {
    let applicantID = sessionStorage.getItem("applicantID");
    let testProfileID = sessionStorage.getItem("testProfileID");

    return this.httpClient.post<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/test',
      JSON.stringify({ applicant_ID: applicantID, testProfile_ID: testProfileID }),
      httpOptions);
  }

  //sets testSource to be the test in the parameter
  setTest(testProfileID) {
    sessionStorage.setItem("testProfileID", testProfileID);
  }

  deleteTest(testID) {
    console.log(testID);
    return this.httpClient.delete<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/test/' + testID,
      httpOptions);
  }
}
