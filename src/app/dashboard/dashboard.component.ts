import { Component, OnInit } from '@angular/core';
import { Message, DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  details: any;
  showthis: boolean;
  constructor(private ajax: AjaxCallService) {
    this.details = new DataBlock("", "","","","",[],"");
    this.showthis = true;
  }

  ngOnInit() {
    this.details = this.ajax.userdata;
    this.ajax.getData();
  }
}
