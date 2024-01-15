import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsLayoutComponent } from './components/statistics-layout/statistics-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'statistics',
    pathMatch: 'full',
  },
  {
    path: 'statistics',
    component: StatisticsLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }