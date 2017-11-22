import { Component, Input } from '@angular/core';
import { Message } from '../jsons/DataClasses';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  constructor() { }
  @Input() myList: Message[];

}
