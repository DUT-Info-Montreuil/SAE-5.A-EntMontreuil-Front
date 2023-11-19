import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableLayoutComponent } from './components/timetable-layout/timetable-layout.component';
import { TimetableRoutingModule } from './timetable-routing.module';



@NgModule({
  declarations: [
    TimetableLayoutComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule
  ]
})
export class TimetableModule { }
