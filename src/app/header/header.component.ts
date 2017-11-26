import { Component, OnInit, OnChanges } from '@angular/core';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  removeId() {
    this.ajax.performLogOut();
  }
  constructor(private ajax: AjaxCallService) { }
  ngOnInit() {  }
  ngOnChanges(){  }

}
