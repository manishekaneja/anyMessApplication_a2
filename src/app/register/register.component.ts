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
  registerClicked: boolean = false;
  invalidAttempt: boolean = false;
  isRegistered: boolean = false;
  waitingForResponse: boolean = false;
  passwordConfirmed: string = '';
  data = new DataBlock();

  constructor(private ajaxCall: AjaxCallService) {
  }

  private validate(): boolean {
    return this.data.fullname &&
      this.data.fullname.length > 0 &&
      this.data.emailValid() &&
      this.data.passwordValid() &&
      this.data.password === this.passwordConfirmed;
  }

  public doRegister(): void {
    this.invalidAttempt = false;
    this.isRegistered = false;
    this.waitingForResponse = true;
    this.registerClicked = true;

    if (this.validate()) {
      this.ajaxCall.doRegister(this.data).subscribe(data => {
        let response: any = data;
        this.invalidAttempt = false;
        if (response.valid) {
          this.waitingForResponse = false;
          this.isRegistered = true;
        }
        else {
          this.waitingForResponse = false;
          this.isRegistered = false;
        }
      })
    }
    else {
      this.waitingForResponse = false;
      this.isRegistered = false;
      this.invalidAttempt = true;
    }
  }

}


