import { Component, OnInit } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../jsons/validation.css']
})
export class LoginComponent implements OnInit {

  data = new DataBlock("", "");
  invalidAttempt = false;
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() { }
  reset() {
    this.data.email = "";
    this.data.password = "";
  }
  doLogin(): void {
    this.ajaxCall.doLogin(this.data).add(() => {
      if (this.ajaxCall.loggedInUser) {
        console.log("redirect to loggin Page");
      }
      else {
        this.reset();
        this.invalidAttempt = true;
      }

    })
  }

}
