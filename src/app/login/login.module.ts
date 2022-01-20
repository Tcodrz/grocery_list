import { PrimeModule } from './../prime/prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
