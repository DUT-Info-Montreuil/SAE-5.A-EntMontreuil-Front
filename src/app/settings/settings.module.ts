import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './components/settings-layout/settings-layout.component';
import { SettingsSidenavComponent } from './components/settings-sidenav/settings-sidenav.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';
import { NotificationsSettingsComponent } from './components/notifications-settings/notifications-settings.component';



@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsSidenavComponent,
    AccountSettingsComponent,
    SecuritySettingsComponent,
    NotificationsSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
