import { Component, OnInit } from '@angular/core';
import { Message } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  details: any;
  constructor(private ajax: AjaxCallService) { }
  ngOnInit() {
    this.details = this.ajax.getData(localStorage.tokenID);
    console.log(this.details.messages);
  }
}
