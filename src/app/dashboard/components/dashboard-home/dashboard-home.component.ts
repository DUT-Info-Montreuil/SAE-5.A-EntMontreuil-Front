import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbsencesService } from 'src/app/core/services/absences.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReminderService } from 'src/app/core/services/reminders.service';

import { ChangeDetectorRef, NgZone } from '@angular/core';
import { CourseService } from 'src/app/core/services/courses.service';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { Course } from 'src/app/core/models/course.model';
import parse from 'date-fns/parse';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addWeeks, endOfWeek, format, isDate, startOfWeek, subDays, subWeeks } from 'date-fns';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { TdService } from 'src/app/core/services/td.services';
import { isWithinInterval } from 'date-fns';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class DashboardHomeComponent implements OnInit {

  today: Date = new Date();

  username!: string;
  absences!: any;
  nbAbsences!: number;

  reminders!: any;
  nbReminders!: number;

  nbCoursesThisWeek!: number;
  private coursesProcessedSubject = new Subject<void>();
  coursesProcessed$ = this.coursesProcessedSubject.asObservable();

  //calendrier
  view: CalendarView = CalendarView.Day;
  name: any;
  date: any;
  startTime: any;
  endTime: any;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedCourse: any;
  excludeDays: number[] = [0, 6]; // Exclure dimanche (0) et samedi (6)
  dayStartHour: number = 8;
  dayEndHour: number = 20;
  hourSegments: number = 2; // Pour avoir des incréments de 30 minutes
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1; // Semaine commence le lundi

  //user
  role: any;
  user: any;
  selectedUser: boolean = false;
  semester: any;

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
    private absenceService: AbsencesService,
    private reminderService: ReminderService,
    private tdService: TdService,
    private trainingService: TrainingService,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private coursesService: CourseService,
    private teachersService: TeachersService,
    private classroomsService: ClassroomsService,
  ) {

    this.username = this.authService.getFirstname();
  }

  ngOnInit(): void {

    this.role = this.authService.getRole()

    if (this.role == "étudiant") {
      this.absenceService.getStudentUnjustifiedAbsences(this.authService.getUserId()).subscribe(data => {
        this.absences = data;
        this.nbAbsences = data.length;
      });
    }

    this.reminderService.getReminderById(this.authService.getUserId()).subscribe(data => {
      this.reminders = data;
      this.nbReminders = data.length;
    });

    this.authService.getUserInfo().subscribe((data) => {
      console.log(data)
      this.user = data
      if (this.role == "étudiant") {
        console.log(this.user)
        this.tdService.getTdInfo(this.user.academic_info.td.id).subscribe((data) => {
          console.log(data);
          this.semester = data.training.semester
          this.getStudentCourses();
        })
      } else if (this.role == "enseignant") {
        this.getTeacherCourses();
      }
    });


  }

  getStudentCourses() {
    this.selectedUser = true
    if (this.user !== null) {
      this.coursesService.getCourseByPromotion(this.user.academic_info.promotion.id, this.semester)
        .subscribe((data: any) => {
          this.processCourseData(data);
          console.log(this.events);
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  getTeacherCourses() {
    if (localStorage.getItem('username') !== null) {
      this.coursesService.getCourseByTeacher(localStorage.getItem('username')!)
        .subscribe((data: any) => {
          this.processCourseDataTeachers(data);
          console.log(data)
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
    // Déclencher la détection de changements
    this.zone.run(() => {
      this.changeDetectorRef.detectChanges();
    });
    this.nbCoursesThisWeek = this.countEventsForCurrentWeek();

  }

  async processCourseDataTeachers(data: any) {
    // Initialisation de this.events
    this.events = [];

    // Traitez chaque type de données de cours
    if (data.courses) {
      await this.createEventsFromCourses(data.courses);
    }
    this.nbCoursesThisWeek = this.countEventsForCurrentWeek();

  }

  getWeekPeriod(): string {
    const start = startOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const end = endOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });
    return `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`;
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
          groupName = await this.coursesService
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
          control: courseData.courses.control,
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
    this.events = [...this.events, ...newEvents];
    this.changeDetectorRef.detectChanges();
  }

  previousWeek(): void {
    this.viewDate = subWeeks(this.viewDate, 1);
  }

  nextWeek(): void {
    this.viewDate = addWeeks(this.viewDate, 1);
  }

  handleEventClick(event: CalendarEvent): void {
    console.log(event);
    this.selectedCourse = event.meta.course;
  }

  previous(): void {
    this.viewDate = subDays(this.viewDate, 1);
  }

  next(): void {
    this.viewDate = addDays(this.viewDate, 1);
  }

  countEventsForCurrentWeek(): number {
    const startOfWeekDate = startOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });
    const endOfWeekDate = endOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });

    console.log('startOfWeekDate:', startOfWeekDate);
    console.log('endOfWeekDate:', endOfWeekDate);

    const eventsInCurrentWeek = this.events.filter(event => {
      console.log('event:', event);

      if (event.start && event.end) {
        const startDate = isDate(event.start) ? event.start : new Date(event.start);
        const endDate = isDate(event.end) ? event.end : new Date(event.end);

        if (isDate(startDate) && isDate(endDate)) {
          return isWithinInterval(startDate, { start: startOfWeekDate, end: endOfWeekDate }) &&
            isWithinInterval(endDate, { start: startOfWeekDate, end: endOfWeekDate });
        }
      }
      return false;
    });

    console.log('eventsInCurrentWeek:', eventsInCurrentWeek);


    return eventsInCurrentWeek.length;
  }


  convertirEtFormaterHeure(heureChaine: string): string {
    if (!heureChaine) return '';

    // Créer une date fictive, car seule l'heure nous intéresse
    const dateFictive = new Date(`1970-01-01T${heureChaine}`);

    return dateFictive.getHours().toString().padStart(2, '0') + 'h' + dateFictive.getMinutes().toString().padStart(2, '0');
  }

  calculateTimeDifference(start: string, end: string): string {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);

    const differenceInMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }


}
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