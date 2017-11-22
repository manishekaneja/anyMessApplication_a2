import { Component, OnInit } from '@angular/core';
import { Login } from '../jsons/LoginClass';
import { AjaxCallService } from '../ajax-call.service';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../jsons/validation.css']
})
export class LoginComponent implements OnInit {

  data = new Login("", "");
  invalidAttempt=false;
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() {
    this.ajaxCall.preCheck();
    if (this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }
  }
  reset(){
    this.data.email="";
    this.data.password="";
  }
  doLogin(): void {
    console.log(this.data);    
    let x=this.ajaxCall.doLogin(this.data);
    console.log(x);
    if (x && this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }
    else{
      this.reset();
      this.invalidAttempt=true;
    }
  }


}
