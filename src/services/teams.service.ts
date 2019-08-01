import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  teams: any[];
  departments: any[];
  availableTests: any[];
  subdepartments: any[];
  selectedDepartment: any;
  selectedSubdepartment: any;

  constructor(public httpClient: HttpClient) {
    this.teams = [];
    this.departments = [];
    this.subdepartments = [];
    this.selectedSubdepartment = null;
    this.selectedDepartment = null;
    this.availableTests = [];
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


    for (let team of this.teams) {
      if (team.department == department) {
        this.subdepartments.push(team);
      }
      this.subdepartments.sort();
    }
    console.log(this.selectedDepartment);

  }


  setSubdepartment(subdepartment) {
    let indexSubdepartment =this.subdepartments.findIndex(res => subdepartment == res.ID);
    console.log(indexSubdepartment);
    if(indexSubdepartment != -1){
      this.selectedSubdepartment = this.subdepartments[indexSubdepartment];
    }
    else{
      this.selectedSubdepartment = 0;
    }

    console.log(this.selectedSubdepartment);
    console.log(subdepartment);
    console.log(this.subdepartments);



  }



}
