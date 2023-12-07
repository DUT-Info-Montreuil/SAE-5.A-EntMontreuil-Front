import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { UsersComponent } from './components/users/users.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { StudentsComponent } from "./components/students/students.component";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { AddUsersComponent } from "./components/form/add-users/add-users.component";
import { AddStudentsComponent } from "./components/form/add-students/add-students.component";
import { AddTeachersComponent } from "./components/form/add-teachers/add-teachers.component";
import { AddStudentsCsvComponent } from './components/form/add-students-csv/add-students-csv.component';
import { TableUsersComponent } from './components/table-users/table-users.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
    },
    { path: 'users', component: TableUsersComponent, canActivate: [AuthGuard] },
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
    { path: 'users/add_user', component: AddUsersComponent, canActivate: [AuthGuard] },
    { path: 'users/add_student', component: AddStudentsComponent, canActivate: [AuthGuard] },
    { path: 'users/add_student_csv',component: AddStudentsCsvComponent, canActivate: [AuthGuard] },
    { path: 'users/add_teacher', component: AddTeachersComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
