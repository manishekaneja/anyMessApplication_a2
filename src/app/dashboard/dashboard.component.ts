import { Component, OnInit } from '@angular/core';
import { Message } from '../jsons/MessageClass';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  myArr:Message[] = [new Message('xy', false), new Message('yz',true), new Message('zx',false)];
  username:string = "Manish";
  show() {
    console.log(this.myArr);
  }
  ngOnInit() {
  }

}
