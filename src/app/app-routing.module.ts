import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { title: 'Tableau de bord' },
      },
      {
        path: 'timetable',
        loadChildren: () =>
          import('./timetable/timetable.module').then((m) => m.TimetableModule),
        data: { title: 'Emploi du temps' },
      },
      {
        path: 'absences',
        loadChildren: () =>
          import('./absences/absences.module').then((m) => m.AbsencesModule),
        data: { title: 'Absences' },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        data: { title: 'Admin' },
      },
      {
        path: 'resp',
        loadChildren: () =>
          import('./resp/resp.module').then((m) => m.RespModule),
        data: { title: 'Responsable EDT' },
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'Notifications' },
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
        data: { title: 'Paramètres' },
      },
      {
        path: 'reminders',
        loadChildren: () =>
          import('./reminders/reminders.module').then((m) => m.RemindersModule),
        data: { title: 'Reminders' },
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('./statistics/statistics.module').then((m) => m.StatisticsModule),
        data: { title: 'Statistiques' },
      },
      {
        path: 'teacher/callroll',
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
        data: { title: 'Teacher' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/