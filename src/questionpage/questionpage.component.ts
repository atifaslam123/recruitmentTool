import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionpageComponent } from '../add-questionpage/add-questionpage.component';
import { AuthService } from '../services/auth.service';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../model/user';
import { TeamsService } from '../services/teams.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';



@Component({
  selector: 'app-questionpage',
  templateUrl: './questionpage.component.html',
  styleUrls: ['./questionpage.component.scss']
})
export class QuestionpageComponent implements OnInit {
  authUser:User = this.authService.currentUser;
  constructor(public team: TeamsService,public question: QuestionService, public router: Router,public modalService: NgbModal, public authService: AuthService) { }
  //filterChecked = this.question.checked;
  questionID: number;
  color:string = 'red';
  hover=false;
  selectedIndex = -1;
  departments=new Set();
  searchText;
  


  show() {
    //this.showMessage = true;
    alert("show");
  }

  //test button to get departments for non hardcoding
  getAllDepartments(){
    this.team.getTeams().then(()=>{
    for(let x of this.team.teams){
      this.departments.add(x.department);
      //console.log(x.ID);
    }
    for(let y of [this.departments]){
      console.log(y);
    }
  });
    //resultTeams.forEach(t=>this.departments.push());
    
  }
  

  addQuestion(){
    const modalRef = this.modalService.open(AddQuestionpageComponent, {size: 'lg', centered : true});
  }

  details(questionID: any) {
      this.router.navigate(['/questionProfile/',questionID]);
      
  }

  hovering(i){
    this.hover=true;
    this.selectedIndex = i;
    // console.log(this.hover);
  }

  notHovering(i){
    this.hover=false;
    this.selectedIndex= -1;
    // console.log(this.hover);
  }


  swalDelete(ID: number,index:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7c2855',
      cancelButtonColor: '#dc4405',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Question has been deleted.',
          'success'
        );
        this.delete(ID,index);
        
        //this.router.navigateByUrl("/questions");
        //this.router.navigateByUrl("/reload");
        //this.question.reset();
        //location.reload();
      }
    })
  }

  delete(ID: number,index:number) {
    console.log("id is : " + ID);
    //let index = this.question.questions.findIndex(res => res.ID === ID);


    console.log(index);
    this.question.deleteQuestion(ID, index);
    
    
  }

  ngOnInit() {
    this.question.getQuestions();
    //this.question.filteredQuestions = this.question.questions;
    sessionStorage.removeItem("questionID");

  }

}
