import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './../prime/prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
