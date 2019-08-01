import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../model/test';
import { SdToastService } from '@sdworx/sd-components';
//import { format } from 'path';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class TestService {

  testAnswers: any[];           //all of the answers to the test
  questionAnswers: any[];       //all of the answers to the current question
  testQuestions: any[];         //all of the questions from the test
  currentQuestion: any;         //the current question
  currentQuestionNumber: number;//the current question index in the array
  testID: number;
  givenAnswers: number[];
  answersAndType: any[];

  constructor(public httpClient: HttpClient, public sdToastService: SdToastService) {
    this.testAnswers = [];
    this.questionAnswers = [];
    this.testQuestions = [];
    this.currentQuestion = null;
    this.currentQuestionNumber = 0;
    this.testID = 0;
    this.givenAnswers = new Array;
    this.answersAndType = [];
    sessionStorage.setItem("applicantAnswers", "[]");
  }
  //GETS all of the questions of the test from the API and afterwards gets the first question using .then()
  getTestQuestions() {
    this.testQuestions = [];

    var test_ID = JSON.parse(sessionStorage.getItem("test")).ID;
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/testquestion/' + test_ID).toPromise().then(res => {
        for (var key in res) {
          this.testQuestions.push(res[key]);
          console.log("Retrieved Question: " + res[key]);
        }
        resolve();
      }).then(() => this.getQuestion()));
    return promise;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //GETS all of the answers of the test from the API and afterwards gets the first answers using .then()
  async getTestAnswers() {
    this.testAnswers = [];
    var test_ID = JSON.parse(sessionStorage.getItem("test")).ID;
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/testanswer/' + test_ID).toPromise().then(res => {
        for (var key in res) {
          this.testAnswers.push(res[key]);
          console.log("Retrieved Answer: " + res[key]);
        }
        resolve();
      }));
    return promise;
  }
  //returns the current question
  getQuestion() {
    var promise = new Promise((resolve, reject) => {
      this.currentQuestion = this.testQuestions[this.currentQuestionNumber];
      console.log(this.testQuestions[this.currentQuestionNumber]);
      resolve();
    }).then(() => this.getQuestionAnswers());
    return promise;
  }
  //returns the current answers
  getQuestionAnswers() {
    this.questionAnswers = [];

    var promise = new Promise((resolve, reject) => {
      for (var key in this.testAnswers) {
        if (this.testAnswers[key].question_ID == this.currentQuestion.ID) {
          this.questionAnswers.push(this.testAnswers[key]);
        }
      }
      resolve();
    })
    return promise;
  }

  //checks whether the answer is already added to sessionstorage, if it is, it deletes it from it if it isn't it adds it to it.
  changeApplicantAnswers(answer) {
    if (sessionStorage.getItem("applicantAnswers") == null) {
      sessionStorage.setItem("applicantAnswers", "[]");
    }
    this.answersAndType = JSON.parse(sessionStorage.getItem("applicantAnswers"));
    this.givenAnswers = [];
    for (let entry of this.answersAndType) {
      this.givenAnswers.push(entry.ID);
    }

    if (this.givenAnswers.includes(answer.ID)) {
      this.givenAnswers.splice(this.givenAnswers.indexOf(answer.ID), 1);
      this.answersAndType.splice(this.answersAndType.findIndex(chosenAnswer => chosenAnswer.ID === answer.ID), 1);
      sessionStorage.setItem("applicantAnswers", JSON.stringify(this.answersAndType));
    }
    else {
      this.givenAnswers.push(answer.ID);
      this.answersAndType.push({ID : answer.ID, questionType : answer.questionType, question_ID : answer.question_ID})
      sessionStorage.setItem("applicantAnswers", JSON.stringify(this.answersAndType));

      if (answer.questionType == "single_answer") {
        console.log("single_Answer");
        for (let entry of this.answersAndType) {
          if (entry.question_ID == answer.question_ID && entry.ID != answer.ID) {
            this.givenAnswers.splice(this.givenAnswers.indexOf(entry.ID), 1);
            this.answersAndType.splice(this.answersAndType.findIndex(chosenAnswer => chosenAnswer.ID === entry.ID), 1);
            sessionStorage.setItem("applicantAnswers", JSON.stringify(this.answersAndType));
          }
        }
      }

    }

  }

  //POSTS the applicant answers from this specific test to the database

  submitApplicantAnswers() {
    let tempAnswers = JSON.parse(sessionStorage.getItem("applicantAnswers"));
    var applicantAnswers = [];
    if (applicantAnswers) {
      for (let applicantAnswer of tempAnswers) {
        applicantAnswers.push(applicantAnswer.ID);
      }
      var applicantTestID = JSON.parse(sessionStorage.getItem("test")).ID;

      var submitableAnswers = [];
      this.givenAnswers = [];
      for (var answer in applicantAnswers) {
        submitableAnswers.push(
          { answer_ID: applicantAnswers[answer], test_ID: applicantTestID }
        );
      }
      return this.httpClient.post<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/applicantAnswer',
        JSON.stringify(submitableAnswers),
        httpOptions);
    }
  }

  finishTest() {

    var currentTestId = JSON.parse(sessionStorage.getItem("test")).ID;
    var currentTestData = JSON.parse(sessionStorage.getItem("currentTest"));  
    var completionTime = JSON.parse(sessionStorage.getItem("timeTaken"));
    this.currentQuestionNumber = 0;

    console.log(
      currentTestId + " " +
      completionTime + " " +
      currentTestData.applicant_ID + " " +
      currentTestData.testProfile_ID
    );
    return this.httpClient.put<Test>('http://recruitmenttoolwebapi.azurewebsites.net/api/test/' + currentTestId, {
      ID: currentTestId,
      dateTimeTaken: currentTestData.dateTimeTaken,
      completionTime: completionTime,
      applicant_ID: currentTestData.applicant_ID,
      testProfile_ID: currentTestData.testProfile_ID
    },
      httpOptions);
  }

  //gets the test ID of the next test to be created and stored that value in sessionStorge
  getTestID() {
    var tests = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/Test/').toPromise().then(res => {
        for (var key in res) {
          tests.push(res[key]);
        }
        var currentTest: Test = tests.pop();
        this.testID = currentTest.ID + 1;
        sessionStorage.setItem("testID", JSON.stringify(this.testID));
        resolve();
      }));
    return promise;
  }
  //gets called as a notification for how long you have left
  onNotify(event) {
    event = JSON.parse(event);
    this.sdToastService.infoMessage(event / 60000 + " minutes left");
  }
  //gets called everytime there is an event happening and logs the time the moment the test stops
  testMethod(event) {
    if (event.action == "stop") {
      console.log(event.left);
    }
  }

  imageExists() {
    if (this.currentQuestion.questionImage) {
      return "assets/images/"+this.currentQuestion.questionImage;
    }
  }

  questionType(questionType) {
    if (questionType == "multiple_answer") {
      return "checkbox"
    }
    else {
      return "radio"
    }
  }
}