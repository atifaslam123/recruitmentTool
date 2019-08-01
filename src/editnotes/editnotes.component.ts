import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantService } from '../services/applicant.service';

@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.scss']
})
export class EditnotesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,public applicantService: ApplicantService) { }
  @Input() public applicant;
  ngOnInit() {
  }
  update(notes){
    this.applicant.notes = notes;
    this.applicantService.updateApplicant(this.applicant);
    this.activeModal.close();
  }

}
