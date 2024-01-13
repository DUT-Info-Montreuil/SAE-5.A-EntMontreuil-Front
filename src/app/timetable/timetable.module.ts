import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableLayoutComponent } from './components/timetable-layout/timetable-layout.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    TimetableLayoutComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    FullCalendarModule,
    DropdownModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ButtonModule

  ],
  providers: []
})
export class TimetableModule { }
