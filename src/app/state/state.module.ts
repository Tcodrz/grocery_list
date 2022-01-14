import { EffectsModule } from '@ngrx/effects';
import { ListsEffects } from './lists/lists.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 30 }),
    EffectsModule.forRoot([ListsEffects])
  ]
})
export class StateModule { }
