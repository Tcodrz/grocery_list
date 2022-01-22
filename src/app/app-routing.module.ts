import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { ListInviteComponent } from './core/components/list-invite/list-invite.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  { path: 'admin', component: AdminComponent },
  { path: 'list-invite/:sListID', component: ListInviteComponent }
];

@NgModule({
  imports: [
    AdminModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
