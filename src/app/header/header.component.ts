import { Component, OnInit } from '@angular/core';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public ajax: AjaxCallService) { }
  removeId() {
    this.ajax.loggedInUser = null;
    if (localStorage.tokenID) {
      localStorage.clear();
    }
  }

  ngOnInit() {
    this.ajax.preCheck();
  }

}
