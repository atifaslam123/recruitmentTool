import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Subscription } from 'rxjs';
import { TestService } from '../services/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditQuestionpageComponent } from '../edit-questionpage/edit-questionpage.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../model/user';
import { EditAnswerpageComponent } from '../edit-answerpage/edit-answerpage.component';

@Component({
  selector: 'app-questionprofile',
  templateUrl: './questionprofile.component.html',
  styleUrls: ['./questionprofile.component.scss']
})
export class QuestionprofileComponent implements OnInit {
  authUser:User = this.authService.currentUser;
  public routeSub: Subscription;
  questionID: any[];
  answers: any[];
  value = true;
  
  constructor(public sanitizer: DomSanitizer,public modalService: NgbModal,public route: ActivatedRoute,public question: QuestionService, public test : TestService, public authService: AuthService ) { }

  ngOnInit() {
    const questionID = this.route.snapshot.paramMap.get('questionID');
    console.log(questionID);
    this.question.getQuestionProfile(questionID);
    this.test.getQuestionAnswers(questionID);
  }

  editQuestions(){

    
    const modalRef = this.modalService.open(EditQuestionpageComponent , { size: 'lg', centered : true});
  }

  editAnswers(){ 
    const modalRef = this.modalService.open(EditAnswerpageComponent , { size: 'lg', centered : true});
  }

  answer(questionID: number){
    this.test.getQuestionAnswers(questionID);
    
  }



}
