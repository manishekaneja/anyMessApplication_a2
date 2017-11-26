import { Component, OnInit } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';
import { Router } from '@angular/router';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../jsons/validation.css']
})
export class LoginComponent implements OnInit {

  data = new DataBlock("", "");
  invalidAttempt = false;
  constructor(public ajaxCall: AjaxCallService,private router:Router) {
  }
  ngOnInit() { }
  reset() {
    this.data.email = "";
    this.data.password = "";
  }
  doLogin(): void {
    this.ajaxCall.doLogin(this.data).add(() => {
      if (this.ajaxCall.loggedInUser) {
        this.router.navigate(['/account/dashboard']);
      }
      else {
        this.reset();
        this.invalidAttempt = true;
      }

    })
  }

}
