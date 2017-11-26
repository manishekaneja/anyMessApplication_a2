import { Component, OnInit } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
// import { EqualCheckDirective } from '../equal-check.directive';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../jsons/validation.css'],
  providers: []
})
export class RegisterComponent implements OnInit {
  invalidAttempt = false;
  registered = false;
  wait = false;
  data = new DataBlock("", "", "", "","");
  constructor(public ajaxCall: AjaxCallService) {
  }
  ngOnInit() {
  }

  doRegister(): void {    // this.ajaxCall.preCheck();

    this.invalidAttempt = false;
    this.registered = false;
    this.wait = true;
    if (this.data.cpassword === this.data.password) {
      this.ajaxCall.doRegister(this.data).add(() => {
        if (this.ajaxCall.registered == true) {
          this.wait = false;
          this.registered = true;
        }
        else {
          this.wait = false;
          this.invalidAttempt = true;
        }
      })
    }
    else {
      this.wait = false;
      this.invalidAttempt = true;
    }
  }
  
}


