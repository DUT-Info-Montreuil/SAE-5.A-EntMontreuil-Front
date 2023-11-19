import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { SettingsLayoutComponent } from "./components/settings-layout/settings-layout.component";
import { AccountSettingsComponent } from "./components/account-settings/account-settings.component";
import { NgModule } from "@angular/core";
import { SecuritySettingsComponent } from "./components/security-settings/security-settings.component";
import { NotificationsSettingsComponent } from "./components/notifications-settings/notifications-settings.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
    },
    {
        path: '',
        component: SettingsLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'account',
                component: AccountSettingsComponent
            },
            {
                path: 'security',
                component: SecuritySettingsComponent
            },
            {
                path: 'notifications',
                component: NotificationsSettingsComponent
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SettingsRoutingModule { }
