import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Message, ApiResponse, User } from "../jsons/DataClasses";
import { AjaxCallService } from "../ajax-call.service";

@Component({
  selector: "app-message-box",
  templateUrl: "./message-box.component.html",
  styleUrls: ["./message-box.component.css"],
})
export class MessageBoxComponent {
  @Input() data: Message;
  public waitingState: boolean;

  constructor(private ajaxService: AjaxCallService) {
    this.waitingState = false;
  }
  toggleLike(): void {
    if (this.waitingState) {
      return;
    }
    this.waitingState = true;
    this.ajaxService.updateMessage(this.data).subscribe(
      (response: ApiResponse): void => {
        this.waitingState = false;
        if (response.code === 200) {
          let updatedUser: User;
          updatedUser = User.convertToUser({
            ...this.ajaxService.userData,
          });
          updatedUser.updateMessage(response.data as Message);
          this.ajaxService.setUser(updatedUser);
          this.ajaxService.notify(
            `Message ${!this.data.liked ? "liked" : "unliked"}`
          );
        } else {
          this.waitingState = false;
          this.ajaxService.notify(`Oops this was not expected`, false);
        }
      },
      (error: Error): void => {
        this.waitingState = false;
        this.ajaxService.notify(`Oops this was not expected`, false);
      }
    );
  }
  deleteMessage(): void {
    if (this.waitingState) {
      return;
    }
    this.waitingState = true;
    this.ajaxService.deleteMessage(this.data).subscribe(
      (response: ApiResponse): void => {
        this.waitingState = false;
        if (response.code === 200) {
          let updatedUser: User;
          updatedUser = User.convertToUser({
            ...this.ajaxService.userData,
          });
          updatedUser.removeMessage(this.data);
          this.ajaxService.setUser(updatedUser);
          this.ajaxService.notify(`Message deleted`);
        } else {
          this.waitingState = false;
          this.ajaxService.notify(`Oops this was not expected`, false);
        }
      },
      (error: Error): void => {
        this.waitingState = false;
        this.ajaxService.notify(`Oops this was not expected`, false);
      }
    );
  }
}
