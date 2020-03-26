import { Component } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../jsons/validation.css']
})
export class LoginComponent {
  data = new DataBlock();
  invalidAttempt = false;
  constructor(public ajaxCall: AjaxCallService, private router: Router) { }

  public reset() {
    delete this.data;
    this.data = new DataBlock();
  }

  public click(a): void {
    console.log(a);
  }

  public doLogin(): void {
    this.ajaxCall.doLogin(this.data).subscribe(data => {
      console.log(data);
      let response: any = data;
      if (response.valid) {
        localStorage.tokenID = response.token;
        this.ajaxCall.loggedInUser = true;
        this.ajaxCall.preCheck().add(() => {
          this.router.navigate(['/account/dashboard']);
        });
      }
      else {
        this.reset();
        this.invalidAttempt = true;
      }
    })
  }
}
