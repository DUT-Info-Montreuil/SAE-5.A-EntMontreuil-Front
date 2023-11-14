import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AbsencesComponent } from './absences/absences.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'absences', component: AbsencesComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
