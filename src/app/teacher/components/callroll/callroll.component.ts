import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { parse } from 'date-fns';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-callroll',
  templateUrl: './callroll.component.html',
  styleUrls: ['./callroll.component.scss']
})
export class CallrollComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  dayStartHour: number = 8;
  dayEndHour: number = 20;
  hourSegments: number = 2;

  handleEventClick(event: CalendarEvent): void {
    console.log(event);
  }

  ngOnInit(): void {
    this.getTeacherCourses();
    console.log(localStorage)
  }

  constructor(private coursesService: CourseService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {

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

  async processCourseDataTeachers(data: any) {
    // Initialisation de this.events
    this.events = [];

    // Traitez chaque type de données de cours
    if (data.courses) {
      this.createEventsFromCourses(data.courses);
    }
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

}
