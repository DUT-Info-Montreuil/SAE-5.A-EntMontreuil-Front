import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SingleClassroomComponent } from './components/single-classroom/single-classroom.component';
import { ButtonModule } from 'primeng/button';
import { ClassroomEquipmentDialogComponent } from './components/classroom-equipment-dialog/classroom-equipment-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    ClassroomsComponent,
    SingleClassroomComponent,
    ClassroomEquipmentDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    TagModule,
    InputTextModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class AdminModule {}
