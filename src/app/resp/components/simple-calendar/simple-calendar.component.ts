import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { CourseService } from 'src/app/core/services/courses.service';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Course } from 'src/app/core/models/course.model';
import { Observable, forkJoin, from, map, mergeMap, of, toArray } from 'rxjs';
import { Degree } from 'src/app/admin/models/degree.model';
import { DegreeService } from 'src/app/core/services/degrees.service';

interface EventExtendedProps {
  professor: string;
  classroom: string;
}
@Component({
  selector: 'app-simple-calendar',
  templateUrl: './simple-calendar.component.html',
  styleUrls: ['./simple-calendar.component.scss'],
})
export class SimpleCalendarComponent implements OnInit {
  name: any;
  date: any;
  startTime: any;
  endTime: any;
  degrees: Degree[] = [];

  selectedPromotionId: number | null = null;
  promotions: Promotion[] = [];
  calendarOptions: CalendarOptions;

  ngOnInit() {
    this.courseService.getAllPromotions().subscribe((data) => {
      this.promotions = data.map((promo) => ({
        ...promo,
        uniqueLabel: `BUT${promo.level}:${promo.year} ${promo.degree_name}`,
      }));
    });
    this.getDegrees();
  }

  constructor(
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef,
    private deegreeService: DegreeService
  ) {
    this.calendarOptions = {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      locale: frLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth',
      },
      slotMinTime: '08:00', // Heure de début des créneaux horaires
      slotMaxTime: '21:00', // Heure de fin des créneaux horaires
      slotDuration: '00:30:00',
      allDaySlot: false,
      weekends: false,
      editable: true,
      events: [],

      eventContent: function (arg) {
        let contentEl = document.createElement('div');
        let startTime = arg.event.start
          ? new Date(arg.event.start).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          : '';
        let endTime = arg.event.end
          ? new Date(arg.event.end).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          : '';

        contentEl.innerHTML = `
    <div class="custom-event">
     
      <div class='event-title'>${arg.event.title}</div>
      <div class='event-professor'>Prof : ${arg.event.extendedProps['professor']}</div>
      <div class='event-classroom'>Salle : ${arg.event.extendedProps['classroom']}</div>
      <div class='event-groupName'>groupe : ${arg.event.extendedProps['groupName']}</div>
    </div>
  `;
        return { domNodes: [contentEl] };
      },
    };
  }

  addEvent(event: any) {
    // Vérifiez si 'this.calendarOptions.events' est un tableau
    // if (Array.isArray(this.calendarOptions.events)) {
    //   // Ajoutez le nouvel événement
    //   console.log(event);
    //   this.calendarOptions.events.push(event);
    //   this.changeDetectorRef.detectChanges();
    // } else {
    //   // Si ce n'est pas un tableau, initialisez-le en tant que tel avec le nouvel événement
    //   this.calendarOptions.events = [event];
    // }

    // this.changeDetectorRef.detectChanges();
    // console.log(this.calendarOptions.events);

    this.changeDetectorRef.detectChanges();
  }

  onPromotionChange() {
    this.calendarOptions.events = [];
    if (this.selectedPromotionId !== null) {
      this.calendarOptions.events = [];
      this.courseService
        .getCourseByPromotion(this.selectedPromotionId)
        .subscribe((data: any) => {
          const coursePromotionObservable = this.createEventsFromCourses(
            data.courses.courses_promotion,
            'promotion'
          );
          const courseTrainingObservables = data.courses.courses_training.map(
            (trainingData: any) =>
              this.createEventsFromCourses(trainingData, 'training')
          );
          const courseTDObservables = data.courses.courses_td.map(
            (tdData: any) => this.createEventsFromCourses(tdData, 'td')
          );
          const courseTPObservables = data.courses.courses_tp.map(
            (tpData: any) => this.createEventsFromCourses(tpData, 'tp')
          );

          forkJoin([
            coursePromotionObservable,
            ...courseTrainingObservables,
            ...courseTDObservables,
            ...courseTPObservables,
          ])
            .pipe(
              map((results) => results.flat()),
              map((events) => {
                const uniqueEvents = new Map();
                events.forEach((event) => {
                  const eventKey = `${event.title}-${event.start}-${event.end}`;
                  if (!uniqueEvents.has(eventKey)) {
                    uniqueEvents.set(eventKey, event);
                  }
                });
                return Array.from(uniqueEvents.values());
              })
            )
            .subscribe((uniqueEvents) => {
              this.calendarOptions.events = uniqueEvents;
              this.changeDetectorRef.detectChanges();
            });
        });
    }
  }

  createEventsFromCourses(
    coursesData: any,
    typeGroupe: string
  ): Observable<any[]> {
    return from(coursesData).pipe(
      mergeMap((courseData: any) => {
        const course = new Course(courseData);
        const startDateTime = `${courseData.courses.dateCourse}T${courseData.courses.startTime}`;
        const endDateTime = `${courseData.courses.dateCourse}T${courseData.courses.endTime}`;
        let id_group = 0;

        switch (typeGroupe) {
          case 'training':
            id_group = courseData.training[0];
            break;
          case 'tp':
            id_group = courseData.tp[0];
            break;
          case 'td':
            id_group = courseData.td[0];
            break;
          case 'promotion':
            return of({
              title: course.resource.name,
              start: startDateTime,
              end: endDateTime,
              color: course.resource.color || '#ffcc00',
              extendedProps: {
                groupName: 'promotion',
                professor: course.teacher
                  .map((t) => `${t.first_name} ${t.last_name}`)
                  .join(', '),
                classroom: course.classroom.map((c) => c.name).join(', '),
              },
            });
        }

        return this.courseService.getGroupName(id_group, typeGroupe).pipe(
          map((groupName) => ({
            title: course.resource.name,
            start: startDateTime,
            end: endDateTime,
            color: course.resource.color || '#ffcc00',
            extendedProps: {
              groupName: groupName,
              professor: course.teacher
                .map((t) => `${t.first_name} ${t.last_name}`)
                .join(', '),
              classroom: course.classroom.map((c) => c.name).join(', '),
            },
          }))
        );
      }),
      toArray() // Regroupez tous les événements dans un tableau
    );
  }
  getDegrees() {
    this.deegreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }
}
