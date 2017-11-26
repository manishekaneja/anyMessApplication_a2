import { Component, OnInit, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AjaxCallService } from '../ajax-call.service';
import { DataBlock } from '../jsons/DataClasses';
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyformComponent implements OnInit, OnChanges {
  data = new DataBlock("", "");
  loggedInUser: boolean;
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() {
  }
  ngOnChanges() {
  }
  doLogin(): void {
    this.ajaxCall.doLogin(this.data);

  }

}

