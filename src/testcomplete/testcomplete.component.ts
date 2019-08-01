import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testcomplete',
  templateUrl: './testcomplete.component.html',
  styleUrls: ['./testcomplete.component.scss']
})
export class TestcompleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.clear();
  }

}
