import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http/';
import { SdToastService } from '@sdworx/sd-components';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant } from '../model/applicant';
import { Test } from '../model/test';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicantloginService {
  constructor(public httpClient: HttpClient, public sdToastService: SdToastService, public route: ActivatedRoute, public router: Router) {
  }

  //looks whether the applicant email is present in the database and if so sets the applicant in sessionstorage
  getApplicant(email) {
    sessionStorage.removeItem("selectedApplicant");
    let params = new HttpParams().set('email', email);
    let applicant = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/applicantlogin/', {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        params: params
      }).toPromise().then(res => {
        for (var key in res) {
          applicant.push(res[key]);
        }
        switch (applicant.length) {
          case 0: {
            this.sdToastService.errorMessage("No records of this email address in the SD Worx Mauritius system");
            break;
          }
          case 1: {
            sessionStorage.setItem("selectedApplicant", JSON.stringify(applicant[0]));
            console.log(applicant[0]);
            break;
          }
          default: {
            console.error("More than 1 record of this email");
            this.sdToastService.errorMessage("Several records of this email address, please contact the test administrator");
            break;
          }
        }resolve();
      }));
    return promise;
  }
  
  getTest(){
    let availableTests = [];
    let selectedApplicantID = JSON.parse(sessionStorage.getItem("selectedApplicant")).ID;
    console.log(selectedApplicantID);
    let promise = new Promise((resolve, reject) =>
    this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/test/'+selectedApplicantID, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).toPromise().then(res => {
      for(var key in res){
        if(res[key].dateTimeTaken == null){
          availableTests.push(res[key]);
        }
      }
      switch (availableTests.length) {
        case 0: {
          this.sdToastService.errorMessage("No test ready for this email address");
          break;
        }
        case 1: {
          console.log(selectedApplicantID);
          sessionStorage.setItem("test", JSON.stringify(availableTests[0]));
          this.router.navigateByUrl("/info");
          break;
        }
        default: {
          console.error("More than 1 record of this email");
          this.sdToastService.errorMessage("several tests ready for this email address, please contact your test administrator");
          break;
        }
      }
      resolve();
    }));
  return promise;

  }

  //updates applicant data with new changes
  updateApplicantInfo(newApplicantData) {
    let applicantData = JSON.parse(sessionStorage.getItem("selectedApplicant"));
    applicantData.first_name = newApplicantData.first_name;
    applicantData.last_name = newApplicantData.last_name;
    applicantData.email = newApplicantData.email.toLowerCase();

    sessionStorage.setItem("selectedApplicant", JSON.stringify(applicantData));


    return this.httpClient.put<Applicant>('http://recruitmenttoolwebapi.azurewebsites.net/api/applicant/' + applicantData.ID, {
      ID: applicantData.ID,
      personal_id: applicantData.ID,
      first_name: applicantData.first_name,
      last_name: applicantData.last_name,
      gender: applicantData.gender,
      statusRecruitment: applicantData.statusRecruitment,
      position: applicantData.position,
      department: applicantData.department,
      notes: applicantData.notes,
      linkedin: applicantData.linkedin,
      email: applicantData.email
    },
      httpOptions);
  }

  //creates a new instance of an applicantTest using the testProfile ID, applicant ID and the current date
  startApplicantTest() {
    var dateTimeTaken = new Date();
    let selectedApplicant = JSON.parse(sessionStorage.getItem("selectedApplicant"));
    var applicant_ID = selectedApplicant.ID;
    var testProfile_ID = sessionStorage.getItem("testProfileID");
    let testID = JSON.parse(sessionStorage.getItem("test")).ID;

    sessionStorage.setItem("currentTest", JSON.stringify({ dateTimeTaken: dateTimeTaken, applicant_ID: applicant_ID, testProfile_ID: testProfile_ID }));
    console.log(JSON.stringify({
      dateTimeTaken: dateTimeTaken
    }));
    return this.httpClient.put<Test>('http://recruitmenttoolwebapi.azurewebsites.net/api/Test/'+testID,{
      dateTimeTaken: dateTimeTaken
    }, httpOptions);
  }
  //changes the selected gender of the applicant
  changeGender(gender) {
    let selectedApplicant = JSON.parse(sessionStorage.getItem("selectedApplicant"));
    selectedApplicant.gender = gender;
    sessionStorage.setItem("selectedApplicant", JSON.stringify(selectedApplicant));
  }

  missingData() {
    this.sdToastService.errorMessage("Please fill in all of the fields");
  }

  async startTest(applicantInfo) {
    let currentInfo = JSON.parse(sessionStorage.getItem("selectedApplicant"));
    if (applicantInfo.email && applicantInfo.last_name && applicantInfo.first_name && currentInfo.gender) {
      await this.updateApplicantInfo(applicantInfo).subscribe();
      await this.startApplicantTest().subscribe();
      await this.router.navigateByUrl("/test");
    }
    else {
      this.missingData();
    }
  }

}
