import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SdToastService } from '@sdworx/sd-components';
//import 'rxjs/add/operator/delay';
import { delay } from 'rxjs/operators';
import { Question} from '../model/question';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  questionProfile: any[];
  questionID: number;
  questions : any[];
  filteredQuestions: any[];
  previousQuestions: any[];
  checkedDepartment= false;
  checkedDifficulty= false;
  checkedCategory= false;
  selectedDifficulty: [];
  selectedQuestionType: [];
  lastInsertedQuestionId :any;
  lastInsertedAssigned= false;
  departmentCount=0;
  difficultyCount=0;
  categoryCount=0;
  categories= [];
  


  //no checkbox checked initially, issue: no questions displayed unless checked
  filter= {IT: false, Support:false, HR:false, All:false, Easy:false, Medium:false, Hard:false, VeryHard:false, SQL:false, Logic:false, agile:false, General_Knowledge:false};

  


  
  isCheckedDepartment(){
    if(this.filter.IT || 
      this.filter.Support ||
      this.filter.HR )
      {
        this.checkedDepartment = true;
      }
      else{
        this.checkedDepartment = false;
      
      }
  }

  isCheckedDifficulty(){
    if(
      this.filter.Easy || 
      this.filter.Medium || 
      this.filter.Hard || 
      this.filter.VeryHard){
        this.checkedDifficulty = true;
    }
    else{
      this.checkedDifficulty = false;
      
    }
  }
  isCheckedCategory(){
    if(
      this.filter.SQL ||
      this.filter.Logic ||
      this.filter.agile || 
      this.filter.General_Knowledge){
        this.checkedCategory = true;
    }
    else{
      this.checkedCategory = false;
    }
  }
  
  constructor(public httpClient: HttpClient, public sdToastService: SdToastService, public router : Router) { 
    // this.questions = [];
    // this.filteredQuestions = [];
    // this.questionProfile = [];

    
  }



  
  // checkbox filtering and displaying when checked
  filterChangeDepartment() {

    this.isCheckedDepartment();
    //console.log(checkboxValue);
      if(this.checkedDepartment){
        console.log("checkedDepartment");
        this.filteredQuestions = this.filteredQuestions.filter(x => 
          (x.department === 'IT' && this.filter.IT) ||
          (x.department === 'Support' && this.filter.Support) ||
          (x.department === 'HR' && this.filter.HR)
        );
        
      }
      else if(this.checkedDifficulty && this.checkedCategory){
        this.filteredQuestions= this.questions;
        this.filterChangeCategory();
        this.filterChangeDifficulty();
      }

      else if(this.checkedDifficulty){
        this.filteredQuestions= this.questions;
        this.filterChangeDifficulty();
      }
      else if(this.checkedCategory){
        this.filteredQuestions= this.questions;
        this.filterChangeCategory();
      }

      else if(!this.checkedCategory && !this.checkedDepartment && !this.checkedDifficulty){
        this.filteredQuestions = this.questions;
        
      }
    
    console.log(this.checkedDepartment);
    
  }

  filterChangeDifficulty() {
    this.isCheckedDifficulty();
      if(this.checkedDifficulty){
        
        this.filteredQuestions = this.filteredQuestions.filter(x => 
          (x.difficulty === 1 && this.filter.Easy) ||
          (x.difficulty === 2 && this.filter.Medium) ||
          (x.difficulty === 3 && this.filter.Hard) ||
          (x.difficulty === 4 && this.filter.VeryHard) 
        );
        
      }
      else if(this.checkedDepartment && this.checkedCategory){
        this.filteredQuestions= this.questions;
        this.filterChangeDepartment();
        this.filterChangeCategory();
      }
      else if(this.checkedDepartment){
        this.filteredQuestions= this.questions;
        this.filterChangeDepartment();
      }
      else if(this.checkedCategory){
        this.filteredQuestions= this.questions;
        this.filterChangeCategory();
      }

      else if(!this.checkedCategory && !this.checkedDepartment && !this.checkedDifficulty){
        this.filteredQuestions = this.questions;
        
      }
    
    console.log(this.checkedDifficulty);
    
  }

  filterChangeCategory() {
    this.isCheckedCategory();
    //console.log(checkboxValue);
      if(this.checkedCategory){
        
        this.filteredQuestions = this.filteredQuestions.filter(x => 
          (x.category === 'SQL' && this.filter.SQL) ||
          (x.category === 'Logic' && this.filter.Logic) ||
          (x.category === 'agile' && this.filter.agile) ||
          (x.category === 'General_Knowledge' && this.filter.General_Knowledge)
          
        );
        
      }
      else if(this.checkedDepartment && this.checkedDifficulty){
        
        this.filterChangeDepartment();
        this.filterChangeDifficulty();
      }
      else if(this.checkedDepartment){
        this.filteredQuestions= this.questions;
        this.filterChangeDepartment();
      }
      else if(this.checkedDifficulty){
        this.filteredQuestions= this.questions;
        this.filterChangeDifficulty();
      }

      else if(!this.checkedCategory && !this.checkedDepartment && !this.checkedDifficulty){
        this.filteredQuestions = this.questions;
        
      }
    
    console.log(this.checkedCategory);
    
  }


  //gets all of the questions from the database
  getQuestions(){
    this.questions =[];
    this.filteredQuestions = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/question/').toPromise().then(res => {
        for (var key in res) {
          this.questions.push(res[key]);
          this.filteredQuestions.push(res[key]);
           
        }
        
        resolve();
      }));
    return promise;
  }

  getQuestionProfile(questionID) {
    this.questionProfile = [];
    this.questionID = questionID;
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/question/' + questionID).toPromise().then(res => {
        for (var key in res) {
          this.questionProfile.push(res[key]);
        }
        resolve()
      }));
    return promise;
  }

  getCategories() {
    this.categories = [];
    let promise = new Promise((resolve, reject) =>
      this.httpClient.get('http://recruitmenttoolwebapi.azurewebsites.net/api/category/').toPromise().then(res => {
        for (var key in res) {
          this.categories.push(res[key]);
        }
        resolve()
      }));
    return promise;
  }

  postQuestion(questionData,questionImage) {
    var data = {
      question_name: questionData.question_name,
      questionImage: questionImage,
      questionText: questionData.questionText,
      category_ID: questionData.category_ID,
      questionType: this.selectedQuestionType,
      department: questionData.department,
      difficulty: this.selectedDifficulty,
      questionWeight: questionData.questionWeight
    }
    console.log("Posting image : " + questionImage);
    
    return this.httpClient.post<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/question',
      JSON.stringify(data),
      httpOptions);

    //   .subscribe((response: Response) => {
    //     this.lastInsertedQuestionId=response;
    //     console.log(this.lastInsertedQuestionId);
    //     this.lastInsertedQuestionId;
    //     this.sdToastService.successMessage('Question has been successfully added');

    // });

    

  }

  postAnswer(answerData){
    
      var data = { 
        question_ID : answerData.lastInsertedQuestionId,
        answerText : answerData.answerText,
        correct : answerData.correct
      }
      
      
      return this.httpClient.post<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/answer',
      JSON.stringify(data),
        httpOptions).pipe(delay(3000)).subscribe((response: Response) => {
          console.log(answerData.answerText + " id : " + this.lastInsertedQuestionId);
          this.sdToastService.successMessage('Answer has been successfully added');
      });
    

  }

  updateQuestion(questionData,questionImageValue) {
    //this.selectedGender == questionData.gender;
    //  selectedDifficulty: [];
  //selectedQuestionType: [];
    var updatedDifficulty;
    updatedDifficulty = questionData.difficulty;
    var updatedQuestionType;
    updatedQuestionType = questionData.questionType;

    if (this.selectedDifficulty != undefined) { 
      updatedDifficulty = this.selectedDifficulty; 
    }
    if (this.selectedQuestionType != undefined) { 
      updatedQuestionType = this.selectedQuestionType; 
    }

    var data = {
      ID: questionData.ID,
      question_name: questionData.question_name,
      questionImage: questionImageValue,
      questionText: questionData.questionText,
      category_ID: questionData.category,
      questionType: updatedQuestionType,
      department: questionData.department,
      difficulty: updatedDifficulty,
      questionWeight: questionData.questionWeight
    }

    return this.httpClient.put<Question>('http://recruitmenttoolwebapi.azurewebsites.net/api/question/' + questionData.ID,
      JSON.stringify(data),
      httpOptions);
  }

  deleteQuestion(questionID: number, index: number) {
    console.log("Index at service is :" + index);
    this.filteredQuestions.splice(index, 1);
    
    return this.httpClient.delete<any>('http://recruitmenttoolwebapi.azurewebsites.net/api/question/' + questionID,
      httpOptions).subscribe((response: Response) => {
        this.sdToastService.successMessage('Question has been successfully deleted');
      }, error => {
        this.sdToastService.errorMessage('Error in deleting question. Please try again!');
      });
  }
  
  changeDifficulty(difficulty) {
    this.selectedDifficulty = difficulty;
  }

  changeType(questionType){
    this.selectedQuestionType =  questionType;
    //console.log(questionType);
  }

  reset(){
    this.questionProfile.splice(0, 1);
  }
}
  
