import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { QuestionService } from '../services/question.service';
import { SdToastService } from '@sdworx/sd-components';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestService } from '../services/test.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-edit-answerpage',
  templateUrl: './edit-answerpage.component.html',
  styleUrls: ['./edit-answerpage.component.scss']
})
export class EditAnswerpageComponent implements OnInit {

  questionID: any;
  editAnswerForm: FormGroup;
  submitted = false;
  answers;
  toggleCorrect = false;
  deletedAnswers=[];
  
  
  constructor(public uploadservice: UploadService, public route: ActivatedRoute,public activeModal: NgbActiveModal,public answer: TestService, public question: QuestionService, public _location: Location, public sdToastService: SdToastService) { }

  return(){
    this.activeModal.close();
    //this.answer.getQuestionAnswers(this.questionID); 
  }

  validatingForms() {

    this.editAnswerForm= new FormGroup({
      //'question_name': new FormControl('', Validators.required),

      });
    }

  onKeyAnswer(answerID,editedAnswer){
    console.log("this is new answer: " + editedAnswer);
    console.log("this is new answer ID : " + answerID);

    for(let ans of this.answers){
      if(ans.ID == answerID){
        ans.answerText= editedAnswer;
      }
    }
    
  }
  
  correctAnswer(answerID){
    console.log("this is correct ID : " + answerID);
    for(let ans of this.answers){
      if(ans.ID == answerID){
        ans.correct = !ans.correct;
      }
    }
  }

  deleteAnswer(answerID){
    console.log("this is delete ID: " + answerID);
    for(let ans of this.answers){
      if(ans.ID == answerID){
        this.deletedAnswers.push(ans);
        this.answers= this.answers.filter(obj => obj !== ans);
      }
    }
  }

  submitAnswer(){
    for(let del of this.deletedAnswers){
      this.answer.deleteAnswer(del.ID).subscribe(()=>{
        if(this.answers.length < 1){
          this.return();
        }
      })
    }

    this.submitted = true;
    for(let ans of this.answers){
      this.answer.updateAnswer({answerText:ans.answerText , correct:ans.correct, ID:ans.ID}).subscribe(()=>{   
        this.return();
      },
      error=>{
        this.sdToastService.successMessage('Error in updating Answers');
      }
      );
 
    }
    this.sdToastService.successMessage('Answers has been successfully updated');

  }

  test(){
    console.log(this.answers);
  }
  ngOnInit() {
    this.submitted = false;
    this.questionID = this.question.questionID;
    Promise.resolve(null).then(() =>{
      this.answer.getAnswer(this.question.questionID).then(
      ()=>{
        this.answers=this.answer.testAnswers;
      }
    )
  });
  
    console.log('questionID is : ' + this.questionID);
    this.validatingForms();
  }

}
