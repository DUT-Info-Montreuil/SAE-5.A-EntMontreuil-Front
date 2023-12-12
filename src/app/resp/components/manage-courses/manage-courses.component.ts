import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import parse from 'date-fns/parse';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-manage-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss'],
})
export class ManageCoursesComponent {
  selectedPromotionId: number | null = null;
  promotions: Promotion[] = [];
  date: any;
  startTime: any;
  endTime: any;

  constructor(
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.courseService.getAllPromotions().subscribe((data) => {
      this.promotions = data.map((promo) => ({
        ...promo,
        uniqueLabel: `BUT${promo.level}:${promo.year} ${promo.degree_name}`,
      }));
      console.log(this.promotions); // Pour vérifier les données
    });
  }

  ngOnInit() {}
  addCourse(arg0: any, arg1: any, arg2: any, arg3: any) {
    throw new Error('Method not implemented.');
  }

  onPromotionChange() {
    if (this.selectedPromotionId !== null) {
      this.courseService
        .getCourseByPromotion(this.selectedPromotionId)
        .subscribe((data: any) => {
          const coursesData = data.courses;
          if (Array.isArray(coursesData)) {
            this.events = [
              ...coursesData.map((courseData: any) => {
                const course = new Course(courseData); // Utilisation de la classe Course pour construire l'objet
                course.dateCourse = courseData.courses.dateCourse;
                course.startTime = courseData.courses.startTime;
                course.endTime = courseData.courses.endTime;
                // Construction des chaînes de date et d'heure
                const startDateTime = `${course.dateCourse}T${course.startTime}`;
                const endDateTime = `${course.dateCourse}T${course.endTime}`;

                // Conversion en objets Date
                const startDate = parse(
                  startDateTime,
                  "yyyy-MM-dd'T'HH:mm:ss",
                  new Date()
                );
                const endDate = parse(
                  endDateTime,
                  "yyyy-MM-dd'T'HH:mm:ss",
                  new Date()
                );

                // Création de l'événement de calendrier
                return {
                  title: course.resource.name, // Nom de la ressource pour le titre
                  start: startDate,
                  end: endDate,
                  color: {
                    primary: course.resource.color || '#ffcc00', // Utilisez une couleur par défaut si nécessaire
                    secondary: course.resource.color || '#ffcc00',
                  },
                  meta: {
                    // Informations supplémentaires
                    resourceName: course.resource.name,
                    teacherNames: 'teacherNames',
                    classroomName: 'classroomName',
                  },
                };
              }),
            ];
            console.log('events'); // Pour vérifier les données
            console.log(this.events); // Pour déboguer
            this.changeDetectorRef.detectChanges();
          } else {
            console.error(
              'Les données de cours ne sont pas un tableau valide:',
              coursesData
            );
          }
        });
    }
  }

  name: any;
  handleEventClick($event: {
    event: CalendarEvent<any>;
    sourceEvent: MouseEvent | KeyboardEvent;
  }) {
    throw new Error('Method not implemented.');
  }

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  excludeDays: number[] = [0, 6]; // Exclure dimanche (0) et samedi (6)
  dayStartHour: number = 8;
  dayEndHour: number = 20;
  hourSegments: number = 2; // Pour avoir des incréments de 30 minutes
  weekStartsOn: number = 1; // Semaine commence le lundi
}
