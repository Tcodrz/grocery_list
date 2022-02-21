import { UnitTypesPipe } from './../core/pipes/unit-types.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import { ModalAddItemComponent } from './components/modal-add-item/modal-add-item.component';
import { ModalAddListComponent } from './components/modal-add-list/modal-add-list.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { ModalItemEditComponent } from './components/modal-item-edit/modal-item-edit.component';
import { NgModule } from '@angular/core';
import { PrimeModule } from './../prime/prime.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import player from 'lottie-web';
import { ModalListEditComponent } from './components/modal-list-edit/modal-list-edit.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';


export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    ImageViewerComponent,
    ModalAddItemComponent,
    ModalAddListComponent,
    ModalConfirmComponent,
    ModalGenericComponent,
    ModalItemEditComponent,
    ModalListEditComponent,
    SpinnerComponent,
    TopnavComponent,
    UnitTypesPipe,
    ImageUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    PrimeModule,
    ReactiveFormsModule,
  ],
  exports: [
    ImageViewerComponent,
    ImageUploadComponent,
    ModalGenericComponent,
    ModalListEditComponent,
    SpinnerComponent,
    TopnavComponent,
    UnitTypesPipe,
  ]
})
export class SharedModule { }
