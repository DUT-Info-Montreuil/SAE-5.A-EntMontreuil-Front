import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { NgModule } from "@angular/core";
import { UsersComponent } from "./components/users/users.component";
import { ClassroomsComponent } from "./components/classrooms/classrooms.component";
import { SingleClassroomComponent } from "./components/single-classroom/single-classroom.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'classrooms', component: ClassroomsComponent, canActivate: [AuthGuard] },
    { path: 'classrooms/:id', component: SingleClassroomComponent, canActivate: [AuthGuard] },
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