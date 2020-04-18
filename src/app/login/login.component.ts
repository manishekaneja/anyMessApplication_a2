import { Component } from "@angular/core";
import { User, ApiResponse } from "../jsons/DataClasses";
import { AjaxCallService } from "../ajax-call.service";
import { Router } from "@angular/router";
import { MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../jsons/validation.css"],
})
export class LoginComponent {
  public userData = new User("", "", "");
  public waitingForResponse: boolean = false;
  // public invalidAttempt: boolean = false;

  constructor(
    private ajaxService: AjaxCallService,
    private routerInstance: Router
  ) {}

  public reset(): void {
    delete this.userData;
    this.userData = new User("", "", "");
  }

  private loginSuccess(response: ApiResponse): void {
    // this.invalidAttempt = false;
    this.waitingForResponse = false;
    this.ajaxService.setUser(response.data);
    this.ajaxService.setToken(response.token);
    this.routerInstance.navigate(["/account/dashboard"]);
    this.ajaxService.notify(`Welcome ${response.data.fullname}.`);
  }

  private loginFailure(): void {
    this.reset();
    // this.invalidAttempt = true;
    this.waitingForResponse = false;
    this.ajaxService.notify(
      "Username or password in incorrect. Please try with correct credintials."
    );
  }

  public doLogin(): void {
    this.waitingForResponse = true;
    let waitingSnackbar: MatSnackBarRef<SimpleSnackBar> = null;
    setTimeout((): void => {
      if (this.waitingForResponse) {
        waitingSnackbar = this.ajaxService.notify(
          `Taking more time than expected. Please be patient.`,
          false
        );
      }
    }, 3000);
    this.ajaxService.loginUser(this.userData).subscribe(
      (response: ApiResponse): void => {
        if (waitingSnackbar) {
          waitingSnackbar.dismiss();
        }
        if (response.code === 200) {
          this.loginSuccess(response);
        } else {
          this.loginFailure();
        }
      },
      (error: Error): void => {
        this.loginFailure();
        console.log({ error });
      }
    );
  }
}
