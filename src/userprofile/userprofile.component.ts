import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ScheduletestService } from '../services/scheduletest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SdToastService } from '@sdworx/sd-components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduletestComponent } from '../scheduletest/scheduletest.component';
import { EditUserpageComponent } from '../edit-userpage/edit-userpage.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  userID: any[];
  constructor(public modalService: NgbModal,public user: UserService,public route: ActivatedRoute, public test: TestService, public dialog: MatDialog, public router: Router) { }
  result: string;

  editUsers(){
    const modalRef = this.modalService.open(EditUserpageComponent, {size: 'lg', centered : true});
  }

  data(ID: number){
    let userIndex = this.user.users.findIndex(res => res.ID === ID)
    console.log(userIndex, this.user.users[userIndex]);
    return userIndex;
  }

  // ngOnInit() {
  //   this.setUserID();
  //   this.user.selectedUser = [];
  //   this.user.selectedUser.push(JSON.parse(sessionStorage.getItem("userProfile")));
  //   console.log(this.user.selectedUser);
  // }
  ngOnInit() {
    const userID = this.route.snapshot.paramMap.get('userID');
    console.log(userID);
    this.user.getUserProfile(userID);
    // this.answers = this.test.getQuestionAnswers(questionID);
  }

  setUserID(){
    if(this.user.userProfile[0]){
      sessionStorage.setItem("userID",this.user.userProfile[0].ID);
    }
  }

}
