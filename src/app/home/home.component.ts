import { Component } from '@angular/core';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn;
  constructor(private ajax: AjaxCallService) { }
  ngOnInit() {
    this.isLoggedIn = this.ajax.loggedInUser;
  }
  ngOnChange(){
    this.isLoggedIn = this.ajax.loggedInUser;    
  }
}