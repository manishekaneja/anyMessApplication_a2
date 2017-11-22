import { Component, OnInit } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../jsons/validation.css']
})
export class RegisterComponent implements OnInit {
  invalidAttempt = false;
  registered=false; 
  data = new DataBlock("", "", "", "", "");
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() {
    this.ajaxCall.preCheck();
    if (this.ajaxCall.loggedInUser) {
      console.log("redirect to loggin Page");
    }
  }
  doRegister(): void {
    if(this.ajaxCall.doRegister(this.data)){
      this.registered=true;
      this.invalidAttempt=false;
    }
    else{
      this.registered=false;
      this.invalidAttempt=true;
    }
  }
}


