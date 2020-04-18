import { Component, OnInit } from "@angular/core";
import { User, ApiResponse } from "../jsons/DataClasses";
import { AjaxCallService } from "../ajax-call.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css", "../jsons/validation.css"],
})
export class SettingComponent implements OnInit {
  invalidAttempt: Boolean;
  registered: Boolean;
  updateButtonClicked: Boolean;
  waitingForResponse: Boolean;
  data: User;
  passwordConfirmed: String;
  constructor(public ajaxCall: AjaxCallService) {
    this.invalidAttempt = false;
    this.registered = false;
    this.updateButtonClicked = false;
    this.waitingForResponse = false;
    this.data = ajaxCall.userData;
  }
  ngOnInit() {
    this.data = this.ajaxCall.userData;
    this.ajaxCall.getFullUserDetails().subscribe((respose: ApiResponse) => {
      this.ajaxCall.setUser(respose.data as User);
      this.ajaxCall.setToken(respose.token);
      this.data = respose.data;
    });
  }
  doUpdate(): void {
    this.invalidAttempt = false;
    this.registered = false;
    this.waitingForResponse = true;
    if (this.passwordConfirmed === this.data.password) {
      this.ajaxCall
        .updateUser(this.data)
        .subscribe((response: ApiResponse): void => {
          console.log({ response });
          this.waitingForResponse = false;
          this.invalidAttempt = false;
          if (response.code === 200) {
            this.registered = true;
            this.ajaxCall.setUser(response.data);
            this.ajaxCall.setToken(response.token);
            this.passwordConfirmed = "";
            this.data = this.ajaxCall.userData;
          } else {
            this.invalidAttempt = true;
          }
        });
    } else {
      this.waitingForResponse = false;
      this.invalidAttempt = true;
    }
  }
}
