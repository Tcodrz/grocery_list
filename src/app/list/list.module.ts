import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from './../prime/prime.module';
import { SharedModule } from './../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ListboxComponent } from './listbox/listbox.component';




@NgModule({
  declarations: [
    ListComponent,
    ListboxComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    PrimeModule,
    SharedModule,
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
