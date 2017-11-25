import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Message } from '../jsons/DataClasses'
import { AjaxCallService } from '../ajax-call.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {

  @Input() data: Message;
  ngOnInit() {
console.log("init");    
  }
  constructor(private ajax:AjaxCallService){}
  toggleFav() {
      this.ajax.updateMessage(this.data);
  }
  removeMess(){
    this.ajax.deleteMessage(this.data);

  }
}















