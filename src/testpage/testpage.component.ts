import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestService } from '../services/performtest.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Observable, interval } from 'rxjs';


@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {

  buttonText:string;
  time : number;
  
  constructor(public test:TestService, public route:ActivatedRoute,public router:Router){
    this.time = 0;
  }

  //navigates to the next question if there is one, and otherwise ends the test
  nextQuestion(totalTime, timeLeft){
    
    if(this.test.currentQuestionNumber < this.test.testQuestions.length-1){
      ++this.test.currentQuestionNumber;
      this.test.getQuestion();
    }
    else{
      var timeTaken =(totalTime  - timeLeft/1000);
      sessionStorage.setItem("timeTaken", JSON.stringify(timeTaken));
      this.endTest();
    }
    this.setContinueButton();

  }

  //goes to the previous question if there is one
  previousQuestion(){

    if (this.test.currentQuestionNumber >0){
      --this.test.currentQuestionNumber;
      this.test.getQuestion();
    }
    this.setContinueButton();

  }

//gets the testID, the test answers, the questions and sets the timer
  ngOnInit(){
    this.test.getTestAnswers().then(()=>this.test.getTestQuestions()).then(()=>this.setContinueButton());
    this.setTime(); 
  }

//makes sure the button either displays submit or next question according to wheter there is a next question
  setContinueButton(){
    if(this.test.currentQuestionNumber < this.test.testQuestions.length-1){ //if there are no questions after this one
      this.buttonText = "Next Question"
    }
    else{
      this.buttonText = "Submit"
    }
  }
  //calls the methods to end and submit the test and navigate to the startscreen 
  async endTest(){
    await this.test.submitApplicantAnswers().subscribe(succes => this.test.finishTest().subscribe(succes => this.router.navigateByUrl('complete')));
  }

  //sets a timer according to the ammount of time available for this type of test
  setTime(){
    let testProfile =JSON.parse(sessionStorage.getItem("test"));
    this.time = testProfile.test_time*60;
    sessionStorage.setItem("time", JSON.stringify(this.time));
  }
  

}
