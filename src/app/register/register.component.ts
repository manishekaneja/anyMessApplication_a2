import { Component, OnInit } from '@angular/core';
import { Register } from '../jsons/RegisterClass';
import { AjaxCallService } from '../ajax-call.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../jsons/validation.css']
})
export class RegisterComponent implements OnInit {
  invalidAttempt = false;

  data = new Register("", "", "", "", "");
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() {
    this.ajaxCall.preCheck();
    if (this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }
  }
  doRegister(): void {
    if (this.ajaxCall.doRegister(this.data) && this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }
  }
}


