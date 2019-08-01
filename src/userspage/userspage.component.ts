import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { TestService } from '../services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditnotesComponent } from '../editnotes/editnotes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AddUserpageComponent } from '../add-userpage/add-userpage.component';


@Component({
  selector: 'app-userspage',
  templateUrl: './userspage.component.html',
  styleUrls: ['./userspage.component.scss']
})
export class UserspageComponent implements OnInit {

  constructor(public user: UserService, public testService: TestService, public router: Router, public modalService: NgbModal) { }

  userID: number;
  filterChecked = this.user.checked;
  selectedId: any;
  clicked: boolean;
  hover=false;
  selectedIndex = -1;
  searchText;

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

  addUsers(){
    const modalRef = this.modalService.open(AddUserpageComponent, {size: 'lg', centered : true});
  }

  details(userID: any) {

     //console.log(userID);
     this.clicked != this.clicked;
     this.user.reset()
     this.user.getUserProfile(userID);
  }
  test(userID: any) {
    console.log("arrived "+ userID);
    // this.user.getTests(userID);
    //this.applicant.getTestQuestion(this.testID);
    this.router.navigate(['/userprofile/' + userID]); 
    this.testService.reset();
  }

  clickMethod(name: string, ID:number) {
    if(confirm("Are you sure to delete " +name)) {
      this.delete(ID);
    }
  }

  swalDelete(ID: number){
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
          'Your file has been deleted.',
          'success'
        );
        this.delete(ID);
        this.user.reset();
      }
    })
  }


  delete(ID: number) {
    let index = this.user.users.findIndex(res => res.ID === ID)
    this.user.deleteUser(ID, index);
  }

  data(ID: number){
    let userIndex = this.user.users.findIndex(res => res.ID === ID)
    //console.log(userIndex, this.user.users[userIndex]);
    return userIndex;
  }
  // adminCheck(){
  //   var selectedUser=JSON.parse(sessionStorage.getItem("selectedUser"));
  //   //console.log(selectedUser.role);
  //   if(selectedUser.role =="Team Leader"){
  //     this.router.navigate(['/questions']);
  //   }
  // }


  ngOnInit() {
    // this.adminCheck();
    this.user.getUsers();
    sessionStorage.removeItem("userID");
  }

}
