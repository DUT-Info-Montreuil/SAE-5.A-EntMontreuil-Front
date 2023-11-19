import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'timetable',
        loadChildren: () => import('./timetable/timetable.module').then(m => m.TimetableModule)
      },
      {
        path: 'absences',
        loadChildren: () => import('./absences/absences.module').then(m => m.AbsencesModule)
      },

      // ... autres routes qui doivent inclure la sidenav
    ]
  },

  // ... autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }