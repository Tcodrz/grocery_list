import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [],
  imports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DropdownModule,
    FocusTrapModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    TabViewModule,
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DropdownModule,
    FocusTrapModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    TabViewModule,
  ]
})
export class PrimeModule { }
