import { Component } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';

@Component({
  selector: 'app-timetable-layout',
  templateUrl: './timetable-layout.component.html',
  styleUrls: ['./timetable-layout.component.scss']
})
export class TimetableLayoutComponent {

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  excludeDays: number[] = [0, 6]; // Exclure dimanche (0) et samedi (6)
  dayStartHour: number = 8;
  dayEndHour: number = 20;
  hourSegments: number = 2; // Pour avoir des incréments de 30 minutes
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1; // Semaine commence le lundi

  constructor() { }

  getWeekPeriod(): string {
    const start = startOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const end = endOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });
    return `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`;
  }

  previousWeek(): void {
    this.viewDate = subWeeks(this.viewDate, 1);
  }

  nextWeek(): void {
    this.viewDate = addWeeks(this.viewDate, 1);
  }
}
