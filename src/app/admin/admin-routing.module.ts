import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'lists', loadChildren: () => import('../list/list.module').then(m => m.ListModule), canActivate: [AuthGuard] },
  { path: '', component: AdminComponent },
  { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
