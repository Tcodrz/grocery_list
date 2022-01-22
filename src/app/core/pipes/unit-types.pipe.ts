import { Pipe, PipeTransform } from '@angular/core';

export enum Units {
  Unit = 'unit',
  Gram = 'gram',
  KiloGram = 'kilogram',
}


@Pipe({
  name: 'unitTypes'
})
export class UnitTypesPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case Units.Unit: return 'יחידות';
      case Units.Gram: return 'גרם';
      case Units.KiloGram: return 'קילו';
      default: return '';
    }
  }

}
