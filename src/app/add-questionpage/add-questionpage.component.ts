import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { QuestionService } from '../services/question.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SdToastService } from '@sdworx/sd-components';
import { throwMatDialogContentAlreadyAttachedError, throwToolbarMixedModesError } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { UploadService } from '../services/upload.service';
import { TeamsService } from '../services/teams.service';
import { LoadingScreenService } from '../services/loading-screen.service';

const URL = '/api/Upload/UploadFiles';
@Component({
  selector: 'app-add-questionpage',
  templateUrl: './add-questionpage.component.html',
  styleUrls: ['./add-questionpage.component.scss']
})
export class AddQuestionpageComponent implements OnInit {
 
  addQuestionForm: FormGroup;
  question_name: FormControl;
  questionText: FormControl;
  category: FormControl;
  questionType:FormControl;
  difficulty: FormControl;
  questionImage: FormControl;
  department:FormControl;
  questionWeight:FormControl;
  answer1:FormControl;
  answer2:FormControl;
  answer3:FormControl;
  answer4:FormControl;

  selectedDifficulty="";
  selectedQuestionType="";

  checked = false;
  secondAnswer = false;
  thirdAnswer = false;
  fourthAnswer = false;
  toggleFirst = false;
  toggleSecond = false;
  toggleThird = false;
  toggleFourth = false;
  firstAnswerValue = '';
  secondAnswerValue = '';
  thirdAnswerValue = '';
  fourthAnswerValue = '';
  questionImageValue='';
  lastInsertedQuestionId;
  submitted = false;
  single_answer;
  multiple_answer;


  
  uploader: FileUploader = new FileUploader({ url: URL, removeAfterUpload: false, autoUpload: true });


  constructor(public loading:LoadingScreenService,public team: TeamsService, public uploadservice: UploadService, public http: HttpClient,public activeModal: NgbActiveModal,public _location: Location, public question: QuestionService,public sdToastService: SdToastService, public router: Router) {

   }
   //uploads
   fileChangeEvent(fileInput: any)
   {
      this.questionImageValue = fileInput.target.files[0].name;
      console.log(this.questionImageValue);
      this.uploadservice.fileChangeEvent(fileInput);
   }

   cancelUpload()
   {
      this.uploadservice.cancelUpload();
   }

   upload()
   {
      this.uploadservice.upload();
   }

   validatePDFSelectedOnly(filesSelected: string[])
   {
      this.uploadservice.validatePDFSelectedOnly(filesSelected);
   }

   uploadFiles()
   {
      this.uploadservice.uploadFiles();
   }
   //uploads


  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}


  submitData(questionData) {
    //console.log(this.selectedDifficulty);
    if (questionData.question_name == "" || questionData.questionText == "" || questionData.category_ID == "" || this.selectedQuestionType == "" || this.selectedDifficulty == "")
    {this.sdToastService.errorMessage('Please fill in the required fields');}
    else {
      this.submitted= true;
      this.question.postQuestion(questionData,this.questionImageValue).subscribe(
        (response: Response)=>{
          this.lastInsertedQuestionId=response;
          //console.log(this.lastInsertedQuestionId);
          
          this.submitAnswer(this.lastInsertedQuestionId);
          this.sdToastService.successMessage('Question has been successfully added');
          this.return();
        });
    }
 
  }

  submitDataAnother(questionData) {
    //console.log(this.selectedDifficulty);
    if (questionData.question_name == "" || questionData.questionText == "" || questionData.category_ID == "" || this.selectedQuestionType == "" || this.selectedDifficulty == "")
    {this.sdToastService.errorMessage('Please fill in the required fields');}
    else {
      this.question.postQuestion(questionData,this.questionImageValue).subscribe((response: Response)=> {
        this.submitAnswer(this.lastInsertedQuestionId);
        this.sdToastService.successMessage('Question has been successfully added');
        this.selectedDifficulty="";
        this.selectedQuestionType="";
        this.checked = false;
        this.secondAnswer = false;
        this.thirdAnswer = false;
        this.fourthAnswer = false;
        this.toggleFirst = false;
        this.toggleSecond = false;
        this.toggleThird = false;
        this.toggleFourth = false;
        this.firstAnswerValue = '';
        this.secondAnswerValue = '';
        this.thirdAnswerValue = '';
        this.fourthAnswerValue = '';
        this.questionImageValue = '';
      });
    }
 
  }

  

  onSelectionChange(difficulty){
    this.question.changeDifficulty(difficulty);
    this.selectedDifficulty = difficulty;
  }
  
  onSelectionChangeType(questionType){
    this.question.changeType(questionType);
    this.selectedQuestionType = questionType;
    this.checked = true;
    
  }

  validatingForms() {
    this.addQuestionForm= new FormGroup({
      'question_name': new FormControl('', Validators.required),
      'questionText': new FormControl('', Validators.required),
      'category_ID': new FormControl('', Validators.required),
      'questionType': new FormControl('', Validators.required),
      'difficulty': new FormControl('', Validators.required),
      'questionImage': new FormControl('', Validators.required),
      'department': new FormControl(''),
      'questionWeight': new FormControl('', Validators.required),
      'answer1': new FormControl(''),
      'answer2': new FormControl(''),
      'answer3': new FormControl(''),
      'answer4': new FormControl(''),


      });
    }
  
  addSecondAnswer(){
    this.secondAnswer = true;
  }
  addThirdAnswer(){
    this.thirdAnswer = true;
  }
  addFourthAnswer(){
    this.fourthAnswer = true;
  }



  removeSecondAnswer(){
    this.secondAnswer= false;
    this.secondAnswerValue = '';
    this.toggleSecond = false;

  }

  removeThirdAnswer(){
    this.thirdAnswer = false;
    this.thirdAnswerValue = '';
    this.toggleThird = false;
    
  }

  removeFourthAnswer(){
    this.fourthAnswer = false;
    this.fourthAnswerValue = '';
    this.toggleFourth = false;
  }


  correctAnswerFirst(){
    this.toggleFirst = !this.toggleFirst;
  }

  correctAnswerSecond(){
    this.toggleSecond = !this.toggleSecond;
  }
  correctAnswerThird(){
    this.toggleThird = !this.toggleThird;
  }
  correctAnswerFourth(){
    this.toggleFourth = !this.toggleFourth;
  }

  return() {
    this.activeModal.close();
    this.loading.startLoading();
    this.question.getQuestions();

  }

  submitAnswer(lastInsertedQuestionId){

    if( this.firstAnswerValue !== ''){
      console.log("first Answer posted");
      //console.log(this.firstAnswerValue);
      this.question.postAnswer({lastInsertedQuestionId: lastInsertedQuestionId,answerText: this.firstAnswerValue,correct: this.toggleFirst});
     }
    if(this.secondAnswer && this.secondAnswerValue !== ''){
      console.log("second Answer posted");
      this.question.postAnswer({lastInsertedQuestionId: lastInsertedQuestionId,answerText: this.secondAnswerValue,correct: this.toggleSecond});
    }
    if(this.thirdAnswer && this.thirdAnswerValue !== ''){
      console.log("third Answer posted");
      this.question.postAnswer({lastInsertedQuestionId: lastInsertedQuestionId,answerText: this.thirdAnswerValue,correct: this.toggleThird});
    }
    if(this.fourthAnswer && this.fourthAnswerValue !== ''){
      console.log("fourth Answer posted");
      this.question.postAnswer({lastInsertedQuestionId: lastInsertedQuestionId,answerText: this.fourthAnswerValue,correct: this.toggleFourth});
    }
  }

  
  onKeyFirstAnswer(firstAnswer:string){
    this.firstAnswerValue = firstAnswer;
    if(this.firstAnswerValue !== ''){
      //console.log("first: " + this.firstAnswerValue);
    }
  }

  onKeySecondAnswer(secondAnswer:string){
    this.secondAnswerValue = secondAnswer;
    if(this.secondAnswerValue !== ''){
      //console.log("second: " + this.secondAnswerValue);
    }
  }

  onKeyThirdAnswer(thirdAnswer:string){
    this.thirdAnswerValue = thirdAnswer;
    if(this.thirdAnswerValue !== ''){
      //console.log("third: " + this.thirdAnswerValue);
    }
  }

  onKeyFourthAnswer(fourthAnswer:string){
    this.fourthAnswerValue = fourthAnswer;
    if(this.fourthAnswerValue !== ''){
      //console.log("fourth: " + this.fourthAnswerValue);
    }
  }



  ngOnInit() {
    
    this.submitted= false;
    this.validatingForms();
    this.question.getCategories().then(()=>console.log(this.question.categories));
    this.loading.stopLoading();
    
  }

}

