import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { UsersComponent } from './components/users/users.component';
import { AdminRoutingModule } from './admin-routing.module'; 
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
import { TrainingListComponent } from './components/training-list/training-list.component';
import { CreateTrainingComponent } from './components/create-training/create-training.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddUsersComponent } from './components/form/add-users/add-users.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AddStudentsComponent } from './components/form/add-students/add-students.component';
import { AddTeachersComponent } from './components/form/add-teachers/add-teachers.component';
import { TagModule } from 'primeng/tag';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { SingleClassroomComponent } from './components/single-classroom/single-classroom.component';
import { ClassroomEquipmentDialogComponent } from './components/classroom-equipment-dialog/classroom-equipment-dialog.component';

@NgModule({
  declarations: [
    MaterialListComponent,
    CreateMaterialComponent,
    UsersComponent,
    TrainingListComponent,
    CreateTrainingComponent,
    UsersComponent,
    StudentsComponent,
    TeachersComponent,
    AddUsersComponent,
    AddStudentsComponent,
    AddTeachersComponent,
    UsersComponent,
    ClassroomsComponent,
    SingleClassroomComponent,
    ClassroomEquipmentDialogComponent,
  ],
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
    TooltipModule,
    DropdownModule,
    SkeletonModule,
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    RadioButtonModule,
    TagModule
  ],
  providers: [ConfirmationService, MessageService, DialogService,    
  ]
})
export class AdminModule {}
