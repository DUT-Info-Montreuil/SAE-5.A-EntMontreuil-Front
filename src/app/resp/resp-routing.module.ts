import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CohortComponent } from './components/cohort/cohort.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { DegreeComponent } from './components/degree/degree.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cohort',
    pathMatch: 'full',
  },
  {
    path: 'cohort',
    component: CohortComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'promotion/:id',
        component: PromotionComponent,
        data: { title: 'Promotion' },
      },
      {
        path: 'degree/:id',
        component: DegreeComponent,
        data: { title: 'Degree' },
      },
      {
        path: 'training/:id',
        component: TrainingComponent,
        data: { title: 'Training' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespRoutingModule {}
