import { LottieModule } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './../prime/prime.module';
import { ModalAddItemComponent } from './components/modal-add-item/modal-add-item.component';
import { ModalAddListComponent } from './components/modal-add-list/modal-add-list.component';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import player from 'lottie-web';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';


export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    ModalGenericComponent,
    ModalAddItemComponent,
    TopnavComponent,
    ModalAddListComponent,
    SpinnerComponent,
    ModalConfirmComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule
  ],
  exports: [
    ModalGenericComponent,
    TopnavComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
