import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TestprofileService } from '../services/testprofile.service';
import { AddTestprofileComponent } from '../add-testprofile/add-testprofile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../model/user';

@Component({
  selector: 'app-testprofilepage',
  templateUrl: './testprofilepage.component.html',
  styleUrls: ['./testprofilepage.component.scss']
})
export class TestprofilepageComponent implements OnInit {
  authUser:User = this.authService.currentUser;
  
  constructor(public modalService: NgbModal,public testProfileService: TestprofileService, public router: Router, public authService: AuthService) { }
  //filterChecked = this.question.checked;
  questionID: number;
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


  show() {
    //this.showMessage = true;
    alert("show");
  }

  ngOnInit() {
    this.testProfileService.getTestProfiles();
    sessionStorage.removeItem("questionID");

  }
  open(){
    const modalRef = this.modalService.open(AddTestprofileComponent, {size: 'lg', centered : true});
  }

  details(questionID: any) {
    
      this.router.navigate(['/testProfile/',questionID]);
      
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
        this.testProfileService.reset();
      }
    })
  }

  delete(ID: number) {
    let index = this.testProfileService.testProfiles.findIndex(res => res.ID === ID)
    this.testProfileService.deleteQuestion(ID, index);
    
  }


}

