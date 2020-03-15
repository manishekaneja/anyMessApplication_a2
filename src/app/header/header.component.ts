import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input('isLoggedIn') isLoggedIn: boolean;
  @Output('openDrawer') openDrawer = new EventEmitter();
  @Output('performLogout') performLogout = new EventEmitter();


}
