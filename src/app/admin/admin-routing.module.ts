import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { UsersComponent } from './components/users/users.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddUsersComponent } from './components/form/add-users/add-users.component';
import { AddStudentsComponent } from './components/form/add-students/add-students.component';
import { AddTeachersComponent } from './components/form/add-teachers/add-teachers.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { SingleClassroomComponent } from './components/single-classroom/single-classroom.component';
import { DegreeListComponent } from './components/degree-list/degree-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'materials',
    component: MaterialListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trainings',
    component: TrainingListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard] },
  { path: 'users/add', component: AddUsersComponent, canActivate: [AuthGuard] },
  {
    path: 'students/add',
    component: AddStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teachers/add',
    component: AddTeachersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classrooms',
    component: ClassroomsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classrooms/:id',
    component: SingleClassroomComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'degrees',
    component: DegreeListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
