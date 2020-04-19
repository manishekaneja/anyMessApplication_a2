import { Component, OnInit } from "@angular/core";
import { AjaxCallService } from "../ajax-call.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ApiResponse, User, Message } from "../jsons/DataClasses";

@Component({
  selector: "app-user-message",
  templateUrl: "./user-message.component.html",
  styleUrls: ["./user-message.component.css"],
})
export class UserMessageComponent implements OnInit {
  public userData: User;
  public messageObject: Message;
  public loading: boolean;

  constructor(
    private ajaxService: AjaxCallService,
    private route: ActivatedRoute,
    private routerInstance: Router
  ) {
    this.userData = new User("", "", "");
    this.loading = true;
    this.messageObject = new Message("", "", "");
  }

  ngOnInit() {
    this.loading = true;
    this.userData = new User(
      this.route.snapshot.paramMap.get("username"),
      "",
      ""
    );
    this.messageObject = new Message("", "", this.userData.id);
    this.ajaxService
      .getBasicUserDetails(this.userData.id)
      .subscribe((response: ApiResponse): void => {
        this.loading = false;
        if (response.code === 200) {
          this.userData = User.convertToUser(response.data);
        } else {
          this.routerInstance.navigate(["/error"]);
        }
      });
  }

  responseSuccess(response: ApiResponse): void {
    delete this.messageObject;
    this.messageObject = new Message("", "", this.userData["_id"]);
    this.ajaxService.notify(`Delivered...`);
  }
  responseFailure(message: string): void {
    this.messageObject.message = message;
    this.ajaxService.notify(`Sorry. Didn't see that coming...`);
  }
  send() {
    let message: string = this.messageObject.message;
    if (this.messageObject.message) {
      this.ajaxService.sendNewMessage(this.messageObject).subscribe(
        (response: ApiResponse): void => {
          if ((response.code = 200)) {
            this.responseSuccess(response);
          } else {
            this.responseFailure(message);
          }
        },
        (error: Error): void => {
          console.log(error);
          this.responseFailure(message);
        }
      );
    } else {
      this.ajaxService.notify("Need a message to Deliver.", false);
    }
  }
}
