import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { GroupsComponent } from './components/groups/groups.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'groups',
        pathMatch: 'full',
    },
    {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RespRoutingModule { }
