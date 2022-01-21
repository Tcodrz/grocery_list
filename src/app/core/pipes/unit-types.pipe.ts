import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitTypes'
})
export class UnitTypesPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'unit': return 'יחידות';
      case 'gram': return 'גרם';
      case 'kilo': return 'קילו';
      default: return '';
    }
  }

}
