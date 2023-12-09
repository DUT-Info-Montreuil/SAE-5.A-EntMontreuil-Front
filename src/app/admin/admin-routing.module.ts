import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { UsersComponent } from './components/users/users.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { AddStudentsCsvComponent } from './components/form/add-students-csv/add-students-csv.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddUsersComponent } from './components/form/add-users/add-users.component';
import { AddStudentsComponent } from './components/form/add-students/add-students.component';
import { AddTeachersComponent } from './components/form/add-teachers/add-teachers.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { SingleClassroomComponent } from './components/single-classroom/single-classroom.component';
import { DegreeListComponent } from './components/degree-list/degree-list.component';
import { RessourceListComponent } from './components/ressource-list/ressource-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
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

  { path: 'users', component: TableUsersComponent, canActivate: [AuthGuard] },
  {
    path: 'users/add_user',
    component: AddUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/add_student',
    component: AddStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/add_student_csv',
    component: AddStudentsCsvComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/add_teacher',
    component: AddTeachersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ressources',
    component: RessourceListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
