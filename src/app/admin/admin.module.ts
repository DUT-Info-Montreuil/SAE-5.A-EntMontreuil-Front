import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './components/material-list/material-list.component';
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
@NgModule({
  declarations: [MaterialListComponent, CreateMaterialComponent],
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
  ],
  providers: [ConfirmationService, MessageService],
})
export class AdminModule {}
