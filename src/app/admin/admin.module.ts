import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListModule } from './../list/list.module';
import { LoginModule } from './../login/login.module';
import { PrimeModule } from './../prime/prime.module';
import { ProfileModule } from './../profile/profile.module';
import { SharedModule } from './../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ListModule,
    LoginModule,
    PrimeModule,
    ProfileModule,
    SharedModule,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AdminModule { }
