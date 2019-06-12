import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileUpdatesComponent } from './components/profile-updates/profile-updates.component';
import {  ActionLogComponent } from './components/action-log/action-log.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:page', component: DashboardComponent },
  { path: 'profile-updates/:id', component: ProfileUpdatesComponent},
  { path: 'action-log', component: ActionLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
