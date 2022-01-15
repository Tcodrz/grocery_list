import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './../prime/prime.module';
import { ModalAddItemComponent } from './components/modal-add-item/modal-add-item.component';
import { ModalAddListComponent } from './components/modal-add-list/modal-add-list.component';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { TopnavComponent } from './components/topnav/topnav.component';



@NgModule({
  declarations: [
    ModalGenericComponent,
    ModalAddItemComponent,
    TopnavComponent,
    ModalAddListComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ModalGenericComponent,
    TopnavComponent
  ]
})
export class SharedModule { }
