import { Injectable } from '@angular/core';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import {
    addDays,
    startOfHour,
    addHours,
    subHours,
    setHours,
    subMinutes,
    addMinutes
} from 'date-fns';

@Injectable()
export class TimetableService {
    getEvents(actions: CalendarSchedulerEventAction[]): Promise<CalendarSchedulerEvent[]> {
        const events = [
            <CalendarSchedulerEvent>{
                id: '1',
                start: new Date('2023-12-04T09:00:00'), // Début le 4 décembre 2023 à 9h00
                end: new Date('2023-12-04T12:00:00'),   // Fin le 4 décembre 2023 à 12h00
                title: 'ANGLAIS',
                content: 'GOLVEN A.<br>A1-01',
                color: { primary: '#ffebb3', secondary: '#ffebb3' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '2',
                start: new Date('2023-12-04T13:30:00'),
                end: new Date('2023-12-04T17:00:00'),
                title: 'SAE PROJET',
                content: 'A1-01',
                color: { primary: '#f5dcfc', secondary: '#f5dcfc' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '3',
                start: new Date('2023-12-05T09:00:00'),
                end: new Date('2023-12-05T12:30:00'),
                title: 'SAE PROJET',
                content: 'A1-01',
                color: { primary: '#f5dcfc', secondary: '#f5dcfc' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '3',
                start: new Date('2023-12-05T13:30:00'),
                end: new Date('2023-12-05T17:00:00'),
                title: 'SAE PROJET',
                content: 'A1-01',
                color: { primary: '#f5dcfc', secondary: '#f5dcfc' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '4',
                start: new Date('2023-12-06T09:00:00'),
                end: new Date('2023-12-06T12:30:00'),
                title: 'CONTROLE - ECONOMIE',
                content: 'COMPAROT V.<br>D0-03 D0-02',
                color: { primary: '#b6ffb0', secondary: '#b6ffb0' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '5',
                start: new Date('2023-12-06T13:30:00'),
                end: new Date('2023-12-06T15:00:00'),
                title: 'MODELISATIONS',
                content: 'RICORDEAU A.<br>',
                color: { primary: '#b0ceff', secondary: '#b0ceff' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '6',
                start: new Date('2023-12-06T15:00:00'),
                end: new Date('2023-12-06T17:00:00'),
                title: 'SAE PROJET',
                content: 'B1-09',
                color: { primary: '#f5dcfc', secondary: '#f5dcfc' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '7',
                start: new Date('2023-12-07T09:00:00'),
                end: new Date('2023-12-07T12:00:00'),
                title: 'NOSQL',
                content: 'LAMOLLE M.<br>A2-05',
                color: { primary: '#fabc75', secondary: '#fabc75' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '8',
                start: new Date('2023-12-07T13:30:00'),
                end: new Date('2023-12-07T15:30:00'),
                title: 'ANGLAIS',
                content: 'GOLVEN A.<br>A1-01',
                color: { primary: '#ffebb3', secondary: '#ffebb3' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '9',
                start: new Date('2023-12-07T15:30:00'),
                end: new Date('2023-12-07T17:30:00'),
                title: 'MODELISATIONS',
                content: 'RICORDEAU A.<br>A2-03',
                color: { primary: '#b0ceff', secondary: '#b0ceff' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '10',
                start: new Date('2023-12-08T09:00:00'),
                end: new Date('2023-12-08T13:00:00'),
                title: 'PROG. AVANCEE',
                content: 'MICCUCI J.<br>A2-05',
                color: { primary: '#ff9180', secondary: '#ff9180' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '11',
                start: new Date('2023-12-08T14:00:00'),
                end: new Date('2023-12-08T17:00:00'),
                title: 'SAE PROJET',
                content: 'B1-14',
                color: { primary: '#f5dcfc', secondary: '#f5dcfc' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
        ];

        return new Promise(resolve => setTimeout(() => resolve(events), 3000));
    }
}
