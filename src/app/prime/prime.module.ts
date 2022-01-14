import { NgModule } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';



@NgModule({
  declarations: [],
  imports: [
    ListboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
  ],
  exports: [
    ListboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
  ]
})
export class PrimeModule { }
