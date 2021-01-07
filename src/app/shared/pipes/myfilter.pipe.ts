import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {
  
  notTouchUsers: any = [];
  transform(items: any[], searchStr: string, type: string): any[] {
    let filterItems = items;
    if (searchStr === '') {

        if (type == 'Сортировка по id (по убыванию)'){
          filterItems.sort((prev, next) => next.id - prev.id);

        } else 
            if (type == 'Сортировка по возрасту (по возрастанию)') {
            filterItems.sort((prev, next) => Number(next.bday.slice(0,4)) - Number(prev.bday.slice(0,4)));

        } else 
            if (type == 'Сортировка по возрасту (по убыванию)') {
              filterItems.sort((prev, next) => Number(prev.bday.slice(0,4)) - Number(next.bday.slice(0,4)));
        }
        return filterItems;
    } else {
      filterItems = items.filter(
        (item) => (item.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) || (item.surname.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1)
      );
      if (type == 'Сортировка по id (по убыванию)'){
        filterItems.sort((prev, next) => next.id - prev.id);

      } else 
          if (type == 'Сортировка по возрасту (по возрастанию)') {
          filterItems.sort((prev, next) => Number(next.bday.slice(0,4)) - Number(prev.bday.slice(0,4)));

      } else 
          if (type == 'Сортировка по возрасту (по убыванию)') {
            filterItems.sort((prev, next) => Number(prev.bday.slice(0,4)) - Number(next.bday.slice(0,4)));
      }
      return filterItems;
    }
  }

}
