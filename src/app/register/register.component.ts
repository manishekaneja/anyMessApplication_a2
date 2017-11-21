import { Component, OnInit } from '@angular/core';
import { Login } from '../jsons/LoginClass';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
