import { Component, OnInit } from '@angular/core';
import { TestprofileService } from '../services/testprofile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../model/user';
import { EditTestprofileComponent } from '../edit-testprofile/edit-testprofile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-testprofile',
  templateUrl: './testprofile.component.html',
  styleUrls: ['./testprofile.component.scss']
})
export class TestprofileComponent implements OnInit {
  authUser:User = this.authService.currentUser;
  constructor(public modalService : NgbModal,public route: ActivatedRoute,public testProfileService: TestprofileService, public authService: AuthService ) {
   }

  ngOnInit() {
    const testProfileID = this.route.snapshot.paramMap.get('testProfileID');
    //console.log(questionID);
    this.testProfileService.getTestProfile(testProfileID).then(()=>
    this.testProfileService.getTeams(testProfileID).then(()=>
    this.testProfileService.getSegments(testProfileID)
    )
    );
  }
  edit(){
    const modalRef = this.modalService.open(EditTestprofileComponent , { size: 'lg', centered : true});
    modalRef.componentInstance.testProfile= this.testProfileService.testProfile ;
    modalRef.componentInstance.testSegments= this.testProfileService.segments ;
    modalRef.componentInstance.testTeams= this.testProfileService.teams ;


  }

  // answer(questionID: number){
  //   this.answers = this.test.getQuestionAnswers(questionID);
  // }
}
