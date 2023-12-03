import { CalendarSchedulerEvent } from 'angular-calendar-scheduler';

export interface ExtendedSchedulerEvent extends CalendarSchedulerEvent {
    classRoom?: string;
}
