import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { AjaxCallService } from "./ajax-call.service";
import { MatSidenav } from "@angular/material/sidenav";
import { ApiResponse } from "./jsons/DataClasses";
import { Router } from "@angular/router";
import { SubjectSubscriber } from "rxjs/internal/Subject";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav") sideNavbar: MatSidenav;
  public loggedIn: boolean = false;
  private loginFlagSubscriber: Subscription;
  constructor(
    private ajaxService: AjaxCallService,
    private routerInstance: Router
  ) {}

  openSideNavbar() {
    this.sideNavbar.open();
  }
  closeSideNavbar() {
    this.sideNavbar.close();
  }

  logoutSuccess(): void {
    this.ajaxService.notify(
      `${this.ajaxService.userData.fullname} logged out Successfully`
    );
    this.ajaxService.setToken("");
    this.ajaxService.setUser(null);
    if (localStorage) {
      localStorage.clear();
    }
    console.log(localStorage);
    this.routerInstance.navigate(["/account/login"]);
  }

  logoutFailure(): void {
    this.ajaxService.notify(
      `Something unexpected happened. Please try after some time`
    );
  }
  performLogoutAction() {
    this.ajaxService.logoutUser().subscribe(
      (response: ApiResponse): void => {
        if (response.code === 200) {
          this.logoutSuccess();
        } else {
          this.logoutFailure();
        }
      },
      (error: Error): void => {
        console.log({ error });
        this.logoutFailure();
      }
    );
  }

  ngOnInit() {
    this.loggedIn = this.ajaxService.isLoggedIn;
    this.loginFlagSubscriber = this.ajaxService.isUserLogedInObserver.subscribe(
      (value) => {
        this.loggedIn = value;
      }
    );
  }
  ngOnDestroy() {
    this.loginFlagSubscriber.unsubscribe();
  }
}
