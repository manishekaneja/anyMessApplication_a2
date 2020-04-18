import { Component } from "@angular/core";
import { User, ApiResponse } from "../jsons/DataClasses";
import { AjaxCallService } from "../ajax-call.service";
import { Router } from "@angular/router";
import { MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css", "../jsons/validation.css"],
  providers: [],
})
export class RegisterComponent {
  public waitingForResponse: boolean = false;
  public confirmPasswordValue: string = "";
  public userData = new User("", "", "");

  constructor(
    private ajaxService: AjaxCallService,
    private routerInstance: Router
  ) {}

  private validate(): boolean {
    return (
      this.userData.fullname &&
      this.userData.fullname.length > 0 &&
      this.userData.emailValid() &&
      this.userData.passwordValid() &&
      this.userData.password === this.confirmPasswordValue
    );
  }
  reset(): void {
    delete this.userData;
    this.userData = new User("", "", "");
  }

  private registerSuccess(response: ApiResponse): void {
    this.waitingForResponse = false;
    this.ajaxService.notify(
      `${response.data.fullname} account has been registered successfully. Redirecting you to Login Screen.`,
      false
    );
    setTimeout((): void => {
      this.routerInstance.navigate(["/account/login"]);
    }, 1500);
  }

  private registerFailure(): void {
    this.waitingForResponse = false;
  }

  public async doRegister() {
    this.waitingForResponse = true;
    let waitingSnackbar: MatSnackBarRef<SimpleSnackBar> = null;
    if (this.validate()) {
      setTimeout((): void => {
        if (this.waitingForResponse) {
          waitingSnackbar = this.ajaxService.notify(
            `Performing the required setup for your profile. Please wait to know your registration status.`,
            false
          );
        }
      }, 3000);
      this.ajaxService.registerUser(this.userData).subscribe(
        (response: ApiResponse): void => {
          if (waitingSnackbar) {
            waitingSnackbar.dismiss();
          }
          if (response.code === 200) {
            this.registerSuccess(response);
          } else {
            this.ajaxService.notify(response.messgae);
            this.registerFailure();
          }
        },
        (error: Error): void => {
          if (waitingSnackbar) {
            waitingSnackbar.dismiss();
          }
          this.registerFailure();
          this.ajaxService.notify(
            `Unexpected Error has occured. Please try after some time.`
          );
          console.log(error);
        }
      );
    } else {
      this.ajaxService.notify(`Please fill all the fields with valid data`);
      this.registerFailure();
    }
  }
}
