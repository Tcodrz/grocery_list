import { SharedModule } from './../shared/shared.module';
import { PrimeModule } from './../prime/prime.module';
import { FormsModule } from '@angular/forms';
import { StateModule } from './../state/state.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    StateModule,
    FormsModule,
    PrimeModule,
    SharedModule,
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
