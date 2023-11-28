import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

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

        path: 'admin/materials',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        data: { title: 'Équipements' },
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
