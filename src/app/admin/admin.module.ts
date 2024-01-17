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
import { CalendarModule } from 'primeng/calendar';
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
import { FileUploadModule } from 'primeng/fileupload';
import { AddStudentsComponent } from './components/form/add-students/add-students.component';
import { AddTeachersComponent } from './components/form/add-teachers/add-teachers.component';
import { TagModule } from 'primeng/tag';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { SingleClassroomComponent } from './components/single-classroom/single-classroom.component';
import { ClassroomEquipmentDialogComponent } from './components/classroom-equipment-dialog/classroom-equipment-dialog.component';
import { DegreeListComponent } from './components/degree-list/degree-list.component';
import { CreateDegreeComponent } from './components/create-degree/create-degree.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddStudentsCsvComponent } from './components/form/add-students-csv/add-students-csv.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { RessourceListComponent } from './components/ressource-list/ressource-list.component';
import { CreateRessourceComponent } from './components/create-ressource/create-ressource.component';
import { RoleComponent } from './components/role/role.component';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';

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
    DegreeListComponent,
    CreateDegreeComponent,
    AddStudentsCsvComponent,
    TableUsersComponent,
    RessourceListComponent,
    CreateRessourceComponent,
    RoleComponent,
    PromotionListComponent,
    CreatePromotionComponent,
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
    TagModule,
    InputNumberModule,
    FileUploadModule,
    CascadeSelectModule,
    CalendarModule
  ],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class AdminModule {}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/