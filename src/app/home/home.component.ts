import { Component } from "@angular/core";
import { AjaxCallService } from "../ajax-call.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  public isLoggedIn: boolean;
  private loginFlagSubscriber: Subscription;
  constructor(private ajaxService: AjaxCallService) {}
  ngOnInit() {
    this.isLoggedIn = this.ajaxService.isLoggedIn;
    this.loginFlagSubscriber = this.ajaxService.isUserLogedInObserver.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }
  ngOnDestroy() {
    this.loginFlagSubscriber.unsubscribe();
  }
}
