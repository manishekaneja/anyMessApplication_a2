import { Component, ViewChild } from '@angular/core';
import { AjaxCallService } from './ajax-call.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent  {
  @ViewChild('sidenav') sideNavbar: MatSidenav;
  openSideNavbar() {
    this.sideNavbar.open();
  }
  performLogoutAction() {
    this.ajax.performLogOut();
  }
  constructor(public ajax: AjaxCallService) {
    if (localStorage.tokenID) {
      this.ajax.preCheck();
    }
  }
}
