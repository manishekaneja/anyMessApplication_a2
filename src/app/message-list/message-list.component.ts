import { Component, OnChanges,Input } from '@angular/core';
import { Message} from '../jsons/MessageClass';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnChanges {

  constructor() { }
  @Input() myList:Message[];
  
  ngOnInit(){
  }
  ngOnChanges(changes:SimpleChanges) {
    // console.log(changes.myList.currentValue);
    // this.myList=changes.myList.currentValue;
    
  }

}
