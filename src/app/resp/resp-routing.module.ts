import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CohortComponent } from './components/cohort/cohort.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { DegreeComponent } from './components/degree/degree.component';
import { TrainingComponent } from './components/training/training.component';
import { TdComponent } from './components/td/td.component';
import { TpComponent } from './components/tp/tp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cohort',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: ManageCoursesComponent,
    canActivate: [AuthGuard],
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
      {
        path: 'td/:id',
        component: TdComponent,
        data: { title: 'TD' },
      },
      {
        path: 'tp/:id',
        component: TpComponent,
        data: { title: 'TP' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespRoutingModule {}
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