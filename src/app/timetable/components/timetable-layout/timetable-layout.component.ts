import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CourseService } from 'src/app/core/services/courses.service';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { Course } from 'src/app/core/models/course.model';
import parse from 'date-fns/parse';
import { CalendarEvent } from 'angular-calendar';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/core/models/classroom.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TdService } from 'src/app/core/services/td.services';

interface EventExtendedProps {
  professor: string;
  classroom: string;
}
@Component({
  selector: 'app-timetable-layout',
  templateUrl: './timetable-layout.component.html',
  styleUrls: ['./timetable-layout.component.scss']
})
export class TimetableLayoutComponent {
  //calendrier
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

  //promotion
  selectedPromotionId: any | null = null;
  promotions: any[] = [];
  promotionCourses!: any[]

  //teacher
  selectedTeacherUsername: any | null = null;
  teachers: any[] = [];
  teacherCourses!: any[]

  //classroom
  selectedClassroomName: any | null = null;
  classrooms: Classroom[] = [];
  classroomCourses!: any[]

  //user
  role : any;
  user : any;
  selectedUser : boolean =false;
  semester : any;

  constructor(private trainingService: TrainingService,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private coursesService: CourseService,
    private teachersService : TeachersService,
    private classroomsService : ClassroomsService,
    private authService : AuthService,
    private tdService : TdService){
  }


  ngOnInit() {

    this.role = this.authService.getRole()

    this.authService.getUserInfo().subscribe((data)=>{
      console.log(data)
      this.user = data
      if(this.role == "étudiant"){
        this.tdService.getTdInfo(this.user.academic_info.td.id).subscribe((data) => {
          console.log(data.training.semester)
          this.semester = data.training.semester
        })
      }
    })

    this.trainingService.getAllTrainingsGroupBy().subscribe((data) => {
      this.promotions = data.map((promo) => ({
        ...promo,
        uniqueLabel: `BUT ${promo.degree_name} S${promo.semester}`,
      }));
    });


    this.teachersService.getAllTeachers().subscribe((data) => {
      this.teachers = data.map((teacher) => ({
        ...teacher,
        uniqueLabel2: `${teacher.user.username}`,
      }));
    });

    this.classroomsService.getClassrooms().subscribe((data) => {
      this.classrooms = data.map((classroom) => ({
        ...classroom,
        uniqueLabel3: `${classroom.name}`,
      }));
    });
  }


  getTeacherCourses() {
    this.selectedUser = true
    this.selectedTeacherUsername = null
    this.selectedClassroomName = null
    this.selectedPromotionId = null
    if (this.user !== null) {
      this.coursesService.getCourseByTeacher(this.user)
        .subscribe((data: any) => {
          this.processCourseDataTeachers(data);
          console.log(data)
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  getStudentCourses() {
    this.selectedUser = true
    
    this.selectedTeacherUsername = null
    this.selectedClassroomName = null
    this.selectedPromotionId = null
    if (this.user !== null) {
      this.coursesService.getCourseByPromotion(this.user.academic_info.promotion.id, this.semester)
        .subscribe((data: any) => {
          this.processCourseData(data);
          console.log(data)
        });
    }
    this.changeDetectorRef.detectChanges();
  }


  onPromotionChange() {
    this.selectedUser = false
    this.selectedTeacherUsername = null
    this.selectedClassroomName = null
    if (this.selectedPromotionId !== null) {
      this.coursesService.getCourseByPromotion(this.selectedPromotionId.id_promotion, this.selectedPromotionId.semester)
        .subscribe((data: any) => {
          this.processCourseData(data);
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  onTeacherChange() {
    this.selectedUser = false
    this.selectedPromotionId = null
    this.selectedClassroomName = null
    if (this.selectedTeacherUsername!== null) {
      this.coursesService.getCourseByTeacher(this.selectedTeacherUsername.user.username)
        .subscribe((data: any) => {
          this.processCourseDataTeachers(data);
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  onClasseroomChange() {
    this.selectedUser = false
    this.selectedPromotionId = null
    this.selectedTeacherUsername = null
    if (this.selectedClassroomName!== null) {
      this.coursesService.getCourseByClassroom(this.selectedClassroomName.name)
        .subscribe((data: any) => {
          this.processCourseDataTeachers(data);
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
  }

  async processCourseDataTeachers(data: any) {
    // Initialisation de this.events
    this.events = [];

    // Traitez chaque type de données de cours
    if (data.courses) {
      this.createEventsFromCourses(data.courses);
    }
    this.zone.run(() => {
      this.changeDetectorRef.detectChanges();
    });
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
    this.zone.run(() => {
      this.changeDetectorRef.detectChanges();
    });
    
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

  
}
