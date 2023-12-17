import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import parse from 'date-fns/parse';
import { Degree } from 'src/app/admin/models/degree.model';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Ressource } from 'src/app/admin/models/ressource.model';
import { Training } from 'src/app/admin/models/training.model';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/courses.service';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { RessourceService } from 'src/app/core/services/ressources.service';

@Component({
  selector: 'app-manage-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss'],
})
export class ManageCoursesComponent {
  selectedPromotionId: number | null = null;
  selectedTrainingId: number | null = null;
  promotions: Promotion[] = [];
  filteredPromotions: Promotion[] = [];
  resources: any[] = [];
  degrees: Degree[] = [];
  trainings: Training[] = [];

  selectedSemester: number | null = null;
  semesterOptions: number[] = [1, 2, 3];

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
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1; // Semaine commence le lundi

  constructor(
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef,
    private deegreeService: DegreeService,
    private ressourceService: RessourceService
  ) {
    this.courseService.getAllPromotions().subscribe((data) => {
      this.promotions = data.map((promo) => ({
        ...promo,
        uniqueLabel: `BUT${promo.level}:${promo.year} ${promo.degree_name}`,
      }));
    });
  }

  ngOnInit() {
    this.getDegrees();
  }
  addCourse(arg0: any, arg1: any, arg2: any, arg3: any) {
    throw new Error('Method not implemented.');
  }

  onPromotionChange() {
    this.selectedSemester = null;
    if (this.selectedPromotionId !== null) {
      this.selectedTrainingId = null;
    }
  }

  onSemesterChange() {
    this.resources = [];
    this.events = [];
    if (this.selectedSemester && this.selectedPromotionId) {
      this.getTrainingOfPromo(this.selectedPromotionId, this.selectedSemester);
      this.courseService
        .getCourseByPromotion(this.selectedPromotionId, this.selectedSemester)
        .subscribe((data: any) => {
          console.log(data);
          const coursePromotionData = data.courses.courses_promotion;
          const courseTrainingData = data.courses.courses_training;
          const courseTDData = data.courses.courses_td;
          const courseTPData = data.courses.courses_tp;
          this.events = [];
          for (let i = 0; i < courseTrainingData.length; i++) {
            this.createEventsFromCourses(courseTrainingData[i]);
          }
          for (let i = 0; i < courseTDData.length; i++) {
            this.createEventsFromCourses(courseTDData[i]);
          }
          for (let i = 0; i < courseTPData.length; i++) {
            this.createEventsFromCourses(courseTPData[i]);
          }
          this.createEventsFromCourses(coursePromotionData);

          this.changeDetectorRef.detectChanges();
          console.log(this.events); // Pour vérifier les données
        });
    }

    console.log(this.selectedSemester);
  }

  onTrainingChange() {
    if (
      this.selectedTrainingId !== null &&
      this.selectedPromotionId !== null &&
      this.selectedSemester !== null
    ) {
      this.ressourceService
        .getRessourceByIdTraining(this.selectedTrainingId)
        .subscribe(
          (data: any) => {
            this.resources = data;
            this.changeDetectorRef.detectChanges();
          },
          (error: any) => {
            console.error('Error loading resources:', error);
          }
        );

      this.courseService
        .getCourseByTraining(this.selectedTrainingId)
        .subscribe((data: any) => {
          const coursesData = data.courses;
          console.log(data);
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
                  title: 'Parcours' + course.resource.name, // Nom de la ressource pour le titre
                  start: startDate,
                  end: endDate,
                  color: {
                    primary: '#000000', // Utilisez une couleur par défaut si nécessaire
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

  getTrainingOfPromo(promotionId: number, idSemester: number) {
    console.log('getTrainingOfPromo');
    this.trainings = [];
    this.courseService
      .getTrainingByPromotionAndSemester(promotionId, idSemester)
      .subscribe((data) => {
        // Handle the retrieved training data here, e.g., assign it to this.trainings
        console.log(data);
        this.trainings = data;
      });
    console.log(this.trainings);
  }

  getDegrees() {
    this.deegreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }
  onDegreeChange(degreeId: number) {
    this.selectedPromotionId = null;
    this.selectedTrainingId = null;
    this.events = [];
    this.filteredPromotions = this.promotions.filter(
      (promo) => promo.id_Degree === degreeId
    );
  }

  createEventsFromCourses(coursesData: any) {
    let newEvents = coursesData.map((courseData: any) => {
      const course = new Course(courseData); // Utilisation de la classe Course pour construire l'objet
      course.dateCourse = courseData.courses.dateCourse;
      course.startTime = courseData.courses.startTime;
      course.endTime = courseData.courses.endTime;

      // Construction des chaînes de date et d'heure
      const startDateTime = `${course.dateCourse}T${course.startTime}`;
      const endDateTime = `${course.dateCourse}T${course.endTime}`;
      //const idCourse = coursesData.courses.id;
      // Conversion en objets Date
      const startDate = parse(
        startDateTime,
        "yyyy-MM-dd'T'HH:mm:ss",
        new Date()
      );
      const endDate = parse(endDateTime, "yyyy-MM-dd'T'HH:mm:ss", new Date());
      console.log(courseData);
      // Création de l'événement de calendrier
      return {
        title: course.resource.name, // Nom de la ressource pour le titre
        start: startDate,
        end: endDate,
        color: {
          primary: '#000000', // Utilisez une couleur par défaut si nécessaire
          secondary: course.resource.color || '#ffcc00',
        },
        meta: {
          // Informations supplémentaires

          courseid: courseData.courses.id,
          resourceName: course.resource.name,
          teacherNames: course.teacher
            .map((t) => `${t.first_name} ${t.last_name}`)
            .join(', '),
          classroomName: course.classroom.map((c) => c.name).join(', '),
        },
      };
    });

    this.events.push(...newEvents);
  }

  previousWeek(): void {
    this.viewDate = subWeeks(this.viewDate, 1);
  }

  nextWeek(): void {
    this.viewDate = addWeeks(this.viewDate, 1);
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
    this.events = [...this.events, event];
    this.changeDetectorRef.detectChanges();
    console.log(this.events);
  }

  getWeekPeriod(): string {
    const start = startOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const end = endOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });
    return `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`;
  }
}
