import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-answerpage',
  templateUrl: './answerpage.component.html',
  styleUrls: ['./answerpage.component.scss']
})
export class AnswerpageComponent implements OnInit {

  constructor(public test: TestService) { }

  ngOnInit() {
    this.test.test = [];
  }




}
