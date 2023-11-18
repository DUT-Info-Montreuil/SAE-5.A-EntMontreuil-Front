import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { SidenavComponent } from "./components/sidenav/sidenav.component";

const routes: Routes = [
    { path: '', component: SidenavComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutingModule { }