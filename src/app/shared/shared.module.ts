import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './../prime/prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { ModalAddItemComponent } from './components/modal-add-item/modal-add-item.component';



@NgModule({
  declarations: [
    ModalGenericComponent,
    ModalAddItemComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalGenericComponent
  ]
})
export class SharedModule { }
