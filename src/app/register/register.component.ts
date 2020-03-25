import { Component } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../jsons/validation.css'],
  providers: []
})
export class RegisterComponent {
  invalidAttempt: boolean = false;
  isRegistered: boolean = false;
  waitngForResponse: boolean = false;
  passwordConfirmed: string = '';
  data = new DataBlock();

  constructor(private ajaxCall: AjaxCallService) {
  }

  doRegister(): void {
    console.log(this.data)
    // this.invalidAttempt = false;
    // this.registered = false;
    // this.wait = true;
    // if (this.data.cpassword === this.data.password) {
    //   this.ajaxCall.doRegister(this.data).subscribe((data) => {
    //     let response: any = data;
    //     if (response.valid == true) {
    //       this.wait = false;
    //       this.registered = true;
    //     }
    //     else {
    //       this.wait = false;
    //       this.invalidAttempt = true;
    //     }
    //   })
    // }
    // else {
    //   this.wait = false;
    //   this.invalidAttempt = true;
    // }
  }

}


