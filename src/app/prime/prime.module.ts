import { NgModule } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [],
  imports: [
    ListboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
  exports: [
    ListboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ]
})
export class PrimeModule { }
