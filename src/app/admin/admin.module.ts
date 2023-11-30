import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { UsersComponent } from './components/users/users.component';
import { AdminRoutingModule } from './admin-routing.module'; // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CreateMaterialComponent } from './components/create-material/create-material.component';
import { DialogModule } from 'primeng/dialog';
import { Ripple, RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import {TrainingListComponent } from './components/training-list/training-list.component';

@NgModule({
  declarations: [MaterialListComponent, CreateMaterialComponent, UsersComponent, TrainingListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    RippleModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class AdminModule { }
