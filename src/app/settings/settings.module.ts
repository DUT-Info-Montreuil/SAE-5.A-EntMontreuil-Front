import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsLayoutComponent } from './components/settings-layout/settings-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SettingsLayoutComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class SettingsModule { }