import { Pipe, PipeTransform } from '@angular/core';
import { Message } from './jsons/DataClasses'
import { registerModuleFactory } from '@angular/core/src/linker/ng_module_factory_loader';

@Pipe({
  name: 'getFav'
})
export class GetFavPipe implements PipeTransform {

  transform(data: Message[]): Message[] {
    return data.filter(my => {
      console.log(my);
      if(my.fav){
        return my;
      }
    }
    );
  }

}
