import { Pipe, PipeTransform,OnChanges } from '@angular/core';
import { Message } from './jsons/MessageClass'

@Pipe({
  name: 'getFav'
})
export class GetFavPipe implements PipeTransform ,OnChanges {

  ngOnChanges(){
  }
  transform(data:Message[]): Message[] {
    return data.filter(my=>my.fav);
  }

}
