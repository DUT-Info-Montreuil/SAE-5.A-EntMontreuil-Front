import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/reset-password', component: ResetPasswordComponent }
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