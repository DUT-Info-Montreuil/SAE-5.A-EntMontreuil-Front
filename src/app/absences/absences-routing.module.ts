import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { AbsencesLayoutComponent } from "./components/absences-layout/absences-layout.component";

const routes: Routes = [
    { path: '', component: AbsencesLayoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AbsencesRoutingModule { }