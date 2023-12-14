import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { CourseService } from 'src/app/core/services/courses.service';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Course } from 'src/app/core/models/course.model';

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
  addCourse(arg0: any, arg1: any, arg2: any, arg3: any) {
    throw new Error('Method not implemented.');
  }
  selectedPromotionId: number | null = null;
  promotions: Promotion[] = [];
  calendarOptions: CalendarOptions;

  constructor(
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef
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
      <div class='event-time'>${startTime} - ${endTime}</div>
      <div class='event-title'>${arg.event.title}</div>
      <div class='event-professor'>Prof : ${arg.event.extendedProps['professor']}</div>
      <div class='event-classroom'>Salle : ${arg.event.extendedProps['classroom']}</div>
    </div>
  `;
        return { domNodes: [contentEl] };
      },
    };
  }

  ngOnInit() {
    this.courseService.getAllPromotions().subscribe((data) => {
      this.promotions = data.map((promo) => ({
        ...promo,
        uniqueLabel: `BUT${promo.level}:${promo.year} ${promo.degree_name}`,
      }));
    });
  }

  onPromotionChange() {
    if (this.selectedPromotionId !== null) {
      this.courseService
        .getCourseByPromotion(this.selectedPromotionId)
        .subscribe((data: any) => {
          const events = data.courses.map((courseData: any) => {
            const course = new Course(courseData);
            return {
              title: course.resource.name,
              start:
                courseData.courses.dateCourse +
                'T' +
                courseData.courses.startTime,
              end:
                courseData.courses.dateCourse +
                'T' +
                courseData.courses.endTime,
              color: course.resource.color || '#ffcc00',
              extendedProps: {
                professor: course.teacher
                  .map((t) => `${t.first_name} ${t.last_name}`)
                  .join(', '),
                classroom: course.classroom.map((c) => c.name).join(', '),
              },
            };
          });

          this.calendarOptions.events = events;
          this.changeDetectorRef.detectChanges();
        });
    }
  }
}
