import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AjaxCallService } from '../ajax-call.service';
import { Login } from '../jsons/LoginClass';
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
  providers: [AjaxCallService]
})
export class MyformComponent {
  data = new Login("", "");
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

