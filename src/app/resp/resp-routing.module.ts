import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CohortComponent } from './components/cohort/cohort.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';

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
    ],
  },
  {
    path: 'courses',
    component: ManageCoursesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespRoutingModule {}
