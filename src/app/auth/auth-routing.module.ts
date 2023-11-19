import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'auth/reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }