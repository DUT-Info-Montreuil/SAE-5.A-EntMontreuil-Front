import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TableModule } from 'primeng/table';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';



@NgModule({
  declarations: [
    UsersComponent,
    StudentsComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule
  ]
})
export class AdminModule { }
