import { NgModule } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { FocusTrapModule } from 'primeng/focustrap';

@NgModule({
  declarations: [],
  imports: [
    ListboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
    CardModule,
    FocusTrapModule,
  ],
  exports: [
    ListboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
    CardModule,
    FocusTrapModule,
  ]
})
export class PrimeModule { }
