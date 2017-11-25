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
    let subs = this.ajaxCall.preCheck();
    if (subs) {
      subs.add(() => {
        this.loggedInUser = this.ajaxCall.loggedInUser;
      })
    }
  }
  ngOnChanges() {
    this.loggedInUser = this.ajaxCall.loggedInUser;
  }
  doLogin(): void {
    this.ajaxCall.doLogin(this.data);
    if (this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }

  }

}

