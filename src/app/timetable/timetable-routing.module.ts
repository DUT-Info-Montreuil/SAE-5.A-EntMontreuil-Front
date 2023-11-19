import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { TimetableLayoutComponent } from "./components/timetable-layout/timetable-layout.component";

const routes: Routes = [
    { path: '', component: TimetableLayoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class TimetableRoutingModule { }