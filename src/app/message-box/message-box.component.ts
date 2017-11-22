import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Message } from '../jsons/MessageClass'

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
  toggleFav() {
    this.data.fav=!this.data.fav;
  }
}















