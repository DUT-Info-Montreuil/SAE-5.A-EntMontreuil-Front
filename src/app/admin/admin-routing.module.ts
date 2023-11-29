import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { NgModule } from "@angular/core";
import { UsersComponent } from "./components/users/users.component";
import { StudentsComponent } from "./components/students/students.component";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { AddUsersComponent } from "./components/form/add-users/add-users.component";
import { AddStudentsComponent } from "./components/form/add-students/add-students.component";
import { AddTeachersComponent } from "./components/form/add-teachers/add-teachers.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
    { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard] },
    { path: 'users/add', component: AddUsersComponent, canActivate: [AuthGuard] },
    { path: 'students/add', component: AddStudentsComponent, canActivate: [AuthGuard] },
    { path: 'teachers/add', component: AddTeachersComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }