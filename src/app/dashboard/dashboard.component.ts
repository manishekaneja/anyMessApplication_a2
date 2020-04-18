import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { User, ApiResponse } from "../jsons/DataClasses";
import { AjaxCallService } from "../ajax-call.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnChanges {
  public userData: User;
  public readonly baseUrl: string;
  constructor(private ajaxService: AjaxCallService) {
    this.userData = ajaxService.userData;
    this.baseUrl = window.location.origin;
  }

  ngOnInit() {
    this.userData = this.ajaxService.userData;
    this.ajaxService.getFullUserDetails().subscribe((respose: ApiResponse) => {
      this.ajaxService.setUser(respose.data);
      this.ajaxService.setToken(respose.token);
      this.userData = User.convertToUser(respose.data);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log({ changes });
    // this.details = this.ajax.userdata
  }
}
