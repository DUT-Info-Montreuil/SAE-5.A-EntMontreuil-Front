import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { RemindersListComponent } from "./components/reminders-list/reminders-list.component";
import { FormsModule } from '@angular/forms';
const routes: Routes = [
    { path: '', component: RemindersListComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports: [
        RouterModule,
        FormsModule,
    ]
})

export class RemindersRoutingModule { }