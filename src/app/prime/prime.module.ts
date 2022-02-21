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
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';

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
    MenuModule,
    ProgressBarModule,
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
    MenuModule,
    ProgressBarModule,
    TabViewModule,
  ]
})
export class PrimeModule { }
