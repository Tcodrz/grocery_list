import { LoginModule } from './../login/login.module';
import { ProfileModule } from './../profile/profile.module';
import { ListModule } from './../list/list.module';
import { PrimeModule } from './../prime/prime.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ListModule,
    ProfileModule,
    SharedModule,
    PrimeModule,
    LoginModule,
  ]
})
export class AdminModule { }
