import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableLayoutComponent } from './components/timetable-layout/timetable-layout.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarDateFormatter, CalendarModule, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ButtonModule } from 'primeng/button';

class CustomDateFormatter extends CalendarDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
  }
}

@NgModule({
  declarations: [
    TimetableLayoutComponent,
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
  providers: [
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ]
})
export class TimetableModule { }
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