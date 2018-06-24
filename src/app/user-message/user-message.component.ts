; import { Component, OnInit } from '@angular/core';
import { AjaxCallService } from '../ajax-call.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {
  constructor(private ajax: AjaxCallService, private route: ActivatedRoute, private router: Router) { }
  user: string;
  fullname: string;
  ngOnInit() {
    this.addMessage = "";
    this.user = this.route.snapshot.paramMap.get('username');
    this.ajax.getUserFullName(this.user).subscribe((res) => {
      if (res.fullName) {
        this.fullname = res.fullName;
      }
      else {
        this.router.navigate(['/error']);
      }
    })
  }
  failed: boolean;
  succ: boolean;
  addMessage: string;
  send() {
    this.ajax.addMessage(this.user, this.addMessage).subscribe((res) => {
      let result = res;
      if (result.valid) {
        this.succ = true;
        setTimeout(() => {
          this.succ = false;
        }, 3000)
      }
      else {
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 3000)
      }
    })
  }



}
