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

@NgModule({
  declarations: [
    UsersComponent,
    ClassroomsComponent,
    SingleClassroomComponent,
    ClassroomEquipmentDialogComponent
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
    FormsModule
  ],
  providers: [
    DialogService
  ], 

})
export class AdminModule { }

