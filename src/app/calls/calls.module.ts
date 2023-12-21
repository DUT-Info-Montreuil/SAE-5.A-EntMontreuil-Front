import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CallsRoutingModule } from './calls-routing.module';
import { CallsComponent } from './components/calls/calls.component';
import { CourseService } from '../core/services/courses.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    CallsComponent,
  ],
  imports: [
    CommonModule,
    CallsRoutingModule,
    TableModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
  ], providers: [
    DatePipe,
    CourseService
  ]
})
export class CallsModule { }
