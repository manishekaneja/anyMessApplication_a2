import { Component, OnInit, OnChanges } from '@angular/core';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  removeId() {
    this.ajax.loggedInUser = null;
    if (localStorage.tokenID) {
      localStorage.clear();
    }
  }
  isloggedInUser;
  constructor(private ajax: AjaxCallService) { }
  ngOnInit() {
    this.ajax.preCheck();
    this.isloggedInUser = this.ajax.loggedInUser;
  }
  ngOnChanges() {
    this.isloggedInUser = this.ajax.loggedInUser;

  }

}
