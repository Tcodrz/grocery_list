import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [
    AdminModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
