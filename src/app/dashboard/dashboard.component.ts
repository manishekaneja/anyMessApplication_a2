import { Component, OnInit, OnChanges } from '@angular/core';
import { DataBlock } from '../jsons/DataClasses';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  details: DataBlock = new DataBlock();
  constructor(public ajax: AjaxCallService) {
    this.details = new DataBlock();
  }

  ngOnInit() {
    this.ajax.preCheck();
    this.details = this.ajax.userdata;
  }
  ngOnChanges() {
    this.details = this.ajax.userdata
  }
}
