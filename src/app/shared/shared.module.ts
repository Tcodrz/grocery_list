import { StateModule } from './../state/state.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './../prime/prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { ModalAddItemComponent } from './components/modal-add-item/modal-add-item.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { ModalAddListComponent } from './components/modal-add-list/modal-add-list.component';
import { HttpClientModule} from '@angular/common/http';



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
    StateModule,
    HttpClientModule
  ],
  exports: [
    ModalGenericComponent,
    TopnavComponent
  ]
})
export class SharedModule { }
