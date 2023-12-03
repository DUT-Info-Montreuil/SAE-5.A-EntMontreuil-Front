import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableLayoutComponent } from './components/timetable-layout/timetable-layout.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule } from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { TimetableService } from '../core/services/timetable.service';

@NgModule({
  declarations: [
    TimetableLayoutComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    SchedulerModule.forRoot({ locale: 'fr', headerDateFormat: 'daysRange', logEnabled: true })
  ],
  providers: [
    TimetableService,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [TimetableLayoutComponent]
})
export class TimetableModule { }
