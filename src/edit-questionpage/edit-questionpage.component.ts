import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { QuestionService } from '../services/question.service';
import { SdToastService } from '@sdworx/sd-components';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestService } from '../services/test.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../services/upload.service';


@Component({
  selector: 'app-edit-questionpage',
  templateUrl: './edit-questionpage.component.html',
  styleUrls: ['./edit-questionpage.component.scss']
})
export class EditQuestionpageComponent implements OnInit {
  editQuestionForm: FormGroup;
  question_name: FormControl;
  questionText: FormControl;
  category: FormControl;
  questionType:FormControl;
  difficulty: FormControl;
  categorySuper: FormControl;

  selectedDifficulty="";
  selectedQuestionType="";

  checked = false;
  secondAnswer = false;
  thirdAnswer = false;
  fourthAnswer = false;
  toggleFirstAnswer = false;
  toggleSecondAnswer = false;
  toggleThirdAnswer = false;
  toggleFourthAnswer = false;
  toggleFirst = false;
  toggleSecond = false;
  toggleThird = false;
  toggleFourth = false;
  firstAnswerValue = '';
  secondAnswerValue = '';
  thirdAnswerValue = '';
  fourthAnswerValue = '';
  newChecked = true;
  newAnswerValue = '';
  questionID;
  questionImageValue;
  categories: any[];
  categoryID;
  profileCategory;
  submitted = false;
 

  constructor(public uploadservice: UploadService, public route: ActivatedRoute,public activeModal: NgbActiveModal,public answer: TestService, public question: QuestionService, public _location: Location, public sdToastService: SdToastService) { 
  }

  onChange(event){
    const newVal = event.target.value;
    console.log(newVal);
  }

  test(categoryId){
    console.log("this is id : " + categoryId);
  }

  return(){
    //console.log("return: " + this.questionID);
    this.activeModal.close();
    //this.question.getQuestionProfile(this.questionID);
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

  submitData(Data){
    console.log("questionImageValue is : " + this.questionImageValue);
    console.log("data.questionImage is : " + Data.questionImage);
    if(this.questionImageValue == undefined ){
      console.log("entered undefined");
      this.questionImageValue = Data.questionImage;
    }
    if (Data.question_name == "" || Data.questionText == "" || Data.category == "" )
    this.sdToastService.errorMessage('Please fill in the required fields');

    else {
      this.submitted = true;
      this.question.updateQuestion(Data,this.questionImageValue).subscribe(
        () => {
          this.return();
          this.question.getQuestionProfile(this.questionID);
          this.sdToastService.successMessage('Question has been successfully updated');
      }, 
        error => {
          this.sdToastService.errorMessage('Error in updating question. Please try again!');
        });
      
    } 
  }

  onKeyAnswer(newAnswer:string){
    this.newAnswerValue = newAnswer;

  }

  validatingForms() {

  this.editQuestionForm= new FormGroup({
    'question_name': new FormControl('', Validators.required),
    'questionText': new FormControl('', Validators.required),
    'category': new FormControl('', Validators.required),
    'questionType': new FormControl('', Validators.required),
    'difficulty': new FormControl(['', Validators.required]),
    'questionWeight': new FormControl('', Validators.required),
    // 'categorySuper': new FormControl('', Validators.required)


    });
  }
  

  ngOnInit() {
    this.submitted = false;
    this.question.getCategories().then(()=>this.categories =this.question.categories);
    this.validatingForms();
    //const questionID = this.route.snapshot.paramMap.get('questionID');
     this.questionID = this.question.questionID;
     console.log('questionID is : ' + this.questionID);
    
    
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

}
