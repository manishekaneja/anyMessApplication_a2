import { Component, OnInit, OnDestroy } from "@angular/core";
import { User, ApiResponse } from "../jsons/DataClasses";
import { AjaxCallService } from "../ajax-call.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public item: number;
  public userData: User;
  public readonly baseUrl: string;
  private userDataSubscription: Subscription;
  constructor(private ajaxService: AjaxCallService) {
    this.userData = ajaxService.userData;
    this.baseUrl = window.location.origin;
    this.item = 3;
  }

  ngOnInit() {
    this.userDataSubscription = this.ajaxService.isUserDataObserver.subscribe(
      (user: User): void => {
        this.userData = user;
      }
    );
    this.ajaxService.getFullUserDetails().subscribe((respose: ApiResponse) => {
      this.ajaxService.setUser(respose.data as User);
      this.ajaxService.setToken(respose.token);
      this.userData = User.convertToUser(respose.data);
    });
  }
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  updateItem(value) {
    this.item = value;
  }
}
