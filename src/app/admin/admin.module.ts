import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SingleClassroomComponent } from './components/single-classroom/single-classroom.component';




@NgModule({
  declarations: [
    UsersComponent,
    ClassroomsComponent,
    SingleClassroomComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    TagModule,
    InputTextModule
  ]
})
export class AdminModule { }

