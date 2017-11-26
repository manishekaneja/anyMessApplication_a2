import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AjaxCallService } from './ajax-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  constructor(private ajax: AjaxCallService) {
    if (localStorage.tokenID) {
      this.ajax.preCheck();
    }
  }
}
