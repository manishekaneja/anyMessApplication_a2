import { Pipe, PipeTransform } from '@angular/core';
import { Message } from './jsons/DataClasses'

@Pipe({
  name: 'getFav'
})
export class GetFavPipe implements PipeTransform  {

  transform(data:Message[]): Message[] {
    return data.filter(my=>my.fav);
  }

}
