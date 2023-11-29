import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddUsersComponent } from './components/form/add-users/add-users.component';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddStudentsComponent } from './components/form/add-students/add-students.component';
import { DialogModule } from 'primeng/dialog';





@NgModule({
  declarations: [
    UsersComponent,
    StudentsComponent,
    TeachersComponent,
    AddUsersComponent,
    AddStudentsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule
  ]
})
export class AdminModule { }
