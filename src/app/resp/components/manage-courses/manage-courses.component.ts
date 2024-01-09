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
import { TD } from 'src/app/core/models/td.model';
import { TP } from 'src/app/core/models/tp.model';
import { CourseService } from 'src/app/core/services/courses.service';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { TrainingService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-manage-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss'],
})
export class ManageCoursesComponent {
  selectedPromotionId: number | null = null;
  selectedTrainingId: number | null = null;
  selectedCourse: any;
  selectedTdId: number | null = null;
  selectedTpId: number | null = null;

  promotions: Promotion[] = [];
  filteredPromotions: Promotion[] = [];
  resources: any[] = [];
  degrees: Degree[] = [];
  trainings: Training[] = [];
  tds: TD[] = [];
  tps: TP[] = [];
  selectedSemester: number | null = null;
  semesterOptions: number[] = [1, 2, 3];

  // In ManageCoursesComponent class

  handleEventClick(event: CalendarEvent): void {
    console.log(event);
    this.selectedCourse = event.meta.course;
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
    private ressourceService: RessourceService,
    private trainingService: TrainingService
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
    this.selectedTrainingId = null;
    this.selectedTdId = null;
    this.selectedTpId = null;
    this.resources = [];
    this.events = [];
    this.tds = [];

    if (this.selectedPromotionId !== null) {
      this.selectedTrainingId = null;
      // Trouvez la promotion sélectionnée et mettez à jour le niveau actuel
      const selectedPromotion = this.promotions.find(
        (promo) => promo.id === this.selectedPromotionId
      );
      if (selectedPromotion) {
        this.updateSemesterOptions(selectedPromotion.level);
      }
    }
  }

  updateSemesterOptions(level: number): void {
    switch (level) {
      case 1:
        this.semesterOptions = [1, 2];
        break;
      case 2:
        this.semesterOptions = [3, 4];
        break;
      case 3:
        this.semesterOptions = [5, 6];
        break;
      default:
        this.semesterOptions = []; // Ou toute autre valeur par défaut que vous souhaitez
        break;
    }
  }

  removeEvent(courseId: number): void {
    // Filter out the event with the given ID
    this.events = this.events.filter(
      (event) => event.meta.courseid !== courseId
    );
    this.changeDetectorRef.detectChanges(); // Since you're using OnPush change detection
  }

  onSemesterChange() {
    this.resources = [];
    this.events = [];
    this.selectedTrainingId = null;
    this.selectedTdId = null;
    this.selectedTpId = null;
    this.tds = [];
    this.tps = [];
    if (this.selectedSemester && this.selectedPromotionId) {
      this.getTrainingOfPromo(this.selectedPromotionId, this.selectedSemester);
      this.courseService
        .getCourseByPromotion(this.selectedPromotionId, this.selectedSemester)
        .subscribe((data: any) => {
          this.processCourseData(data);
          this.events = this.removeDuplicateEvents(this.events);
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  async processCourseData(data: any) {
    // Initialisation de this.events
    this.events = [];

    // Traitez chaque type de données de cours
    if (data.courses && data.courses.courses_promotion) {
      await this.createEventsFromCourses(data.courses.courses_promotion);
    }
    if (data.courses && data.courses.courses_training) {
      await this.createEventsFromCourses(data.courses.courses_training);
    }
    if (data.courses && data.courses.courses_td) {
      await this.createEventsFromCourses(data.courses.courses_td);
    }
    if (data.courses && data.courses.courses_tp) {
      await this.createEventsFromCourses(data.courses.courses_tp);
    }

    // Éliminer les doublons
    this.events = this.removeDuplicateEvents(this.events);

    // Déclencher la détection de changements
    this.changeDetectorRef.detectChanges();
  }

  removeDuplicateEvents(events: CalendarEvent[]): CalendarEvent[] {
    const uniqueEventIds = new Set();
    const uniqueEvents = events.filter((event) => {
      const courseid = event.meta.courseid;
      if (!uniqueEventIds.has(courseid)) {
        uniqueEventIds.add(courseid);
        return true;
      }
      return false;
    });
    return uniqueEvents;
  }

  onTrainingChange() {
    console.log('onTrainingChange');
    this.tds = [];
    this.tps = [];
    this.events = [];
    this.selectedTdId = null;
    this.selectedTpId = null;
    if (
      this.selectedTrainingId !== null &&
      this.selectedPromotionId !== null &&
      this.selectedSemester !== null
    ) {
      this.fetchTDsByTrainingId(this.selectedTrainingId);
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
    this.trainings = [];
    this.tds = [];
    this.tps = [];
    this.selectedSemester = null;
    this.selectedTdId = null;
    this.selectedTrainingId = null;
    this.selectedTpId = null;
    this.events = [];
    this.filteredPromotions = this.promotions.filter(
      (promo) => promo.id_Degree === degreeId
    );
  }

  async createEventsFromCourses(coursesData: any) {
    let newEventsPromises = coursesData.map(async (courseData: any) => {
      const course: any = new Course(courseData); // Supposons que Course est une classe définie ailleurs
      course.dateCourse = courseData.courses.dateCourse;
      course.startTime = courseData.courses.startTime;
      course.endTime = courseData.courses.endTime;

      let groupName = '';
      let groupId = null;
      let groupType = '';
      if (course.promotion && course.promotion.length > 0) {
        groupId = course.promotion[0];
        groupType = 'promotion';
      } else if (course.training && course.training.length > 0) {
        groupId = course.training[0];
        groupType = 'training';
      } else if (course.td && course.td.length > 0) {
        groupId = course.td[0];
        groupType = 'td';
      } else if (course.tp && course.tp.length > 0) {
        groupId = course.tp[0];
        groupType = 'tp';
      }

      if (groupId != null && groupType !== '') {
        try {
          groupName = await this.courseService
            .getGroupName(groupId, groupType)
            .toPromise();
        } catch (error) {
          console.error(
            `Erreur lors de la récupération du nom de ${groupType}`,
            error
          );
        }
      }

      const startDateTime = `${course.dateCourse}T${course.startTime}`;
      const endDateTime = `${course.dateCourse}T${course.endTime}`;
      const startDate = parse(
        startDateTime,
        "yyyy-MM-dd'T'HH:mm:ss",
        new Date()
      );
      const endDate = parse(endDateTime, "yyyy-MM-dd'T'HH:mm:ss", new Date());

      return {
        title: course.resource.name,
        start: startDate,
        end: endDate,
        color: {
          primary: '#000000', // couleur par défaut
          secondary: course.resource.color || '#ffcc00',
        },
        meta: {
          course: courseData,
          courseid: courseData.courses.id,
          resourceName: course.resource.name,
          teacherNames: course.teacher
            .map((t: any) => `${t.initial}`)
            .join(', '),
          classroomName: course.classroom.map((c: any) => c.name).join(', '),
          groupName: groupName,
        },
      };
    });

    const newEvents = await Promise.all(newEventsPromises);
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

  fetchTDsByTrainingId(trainingId: number): void {
    this.trainingService.getTDsByTrainingId(trainingId).subscribe(
      (data) => {
        this.tds = data;
        this.changeDetectorRef.detectChanges(); // Since using OnPush change detection
        console.log(this.tds);
        if (
          this.selectedTrainingId &&
          this.selectedSemester &&
          this.selectedPromotionId
        ) {
          if (this.tds.length > 0) {
            this.courseService
              .getCourseByTraining(this.selectedTrainingId)
              .subscribe((data: any) => {
                this.processCourseData(data);
              });
          } else {
            this.courseService
              .getCourseByPromotion(
                this.selectedPromotionId,
                this.selectedSemester
              )
              .subscribe((data: any) => {
                this.processCourseData(data);
                this.events = this.removeDuplicateEvents(this.events);
              });
          }
        }
      },
      (error) => {
        console.error('Error fetching TDs:', error);
      }
    );
    this.changeDetectorRef.detectChanges();
  }

  fetchTpsByTDId(tdId: number): void {
    this.trainingService.getTpsByTDID(tdId).subscribe(
      (data) => {
        this.tps = data;
        console.log('TPs fetched:', this.tps);
        console.log('TPs length:', this.tps.length);
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching tps:', error);
      }
    );
  }

  onTdChange() {
    console.log('onTdChange - TD selected:', this.selectedTdId);
    this.selectedTpId = null;
    if (this.selectedTdId !== null) {
      this.events = [];
      this.fetchTpsByTDId(this.selectedTdId);
      this.courseService
        .getCourseByTD(this.selectedTdId)
        .subscribe((data: any) => {
          this.processCourseData(data);
        });
    }
  }

  onTpChange() {
    console.log('onTpChange - TP selected:', this.selectedTpId);
    if (this.selectedTpId) {
      this.events = [];
      this.courseService
        .getCourseByTp(this.selectedTpId)
        .subscribe((data: any) => {
          console.log(data);
          this.processCourseData(data);
        });
    }
  }

  getWeekPeriod(): string {
    const start = startOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const end = endOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });
    return `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`;
  }

  resetModal(): void {
    this.selectedCourse = null;
    this.changeDetectorRef.markForCheck(); // Trigger change detection manually
  }
}
