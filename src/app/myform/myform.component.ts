import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AjaxCallService } from '../ajax-call.service';
import { DataBlock } from '../jsons/DataClasses';
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyformComponent {
  data = new DataBlock("", "");
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() {
    this.ajaxCall.preCheck();
    if (this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }
  }
  doLogin(): void {
    this.ajaxCall.doLogin(this.data);
    if (this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }

  }

}

