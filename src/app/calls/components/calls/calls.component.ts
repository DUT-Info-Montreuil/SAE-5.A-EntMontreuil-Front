import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/core/services/calls.service';
import { CourseService } from 'src/app/core/services/courses.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-call-list',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss']
})
export class CallsComponent implements OnInit {
  selectedCourse: any;
  calendarDate: Date = new Date();
  courses: any[] = [];
  formattedDate: any;

  constructor(
    private courseService: CourseService,
    private callsService: CallsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.formattedDate = this.formatDate(this.calendarDate); // Ajoutez cela pour formater la date
    this.loadCoursesForDate(this.formattedDate);
  }

  loadCoursesForDate(formattedDate: string) {
    this.courseService.getAllCoursesForDate(formattedDate).subscribe(response => {
      if (response && Array.isArray(response.courses)) {

        this.courses = response.courses;
        console.log(this.courses)
      } else {
        // Gérez le cas où la réponse ne contient pas la propriété attendue
        console.error("La réponse de l'API ne contient pas la propriété 'courses'.");
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = (month < 10) ? `0${month}` : `${month}`;
    const formattedDay = (day < 10) ? `0${day}` : `${day}`;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
    
  }

  onCourseClick(course: any) {
    if (course) {
      this.selectedCourse = course;
      console.log('Course:', course);
      console.log('Course Id:', course.id);
      this.loadCalls(course.courses.id);
  } else {
      console.error('Invalid course or course id:', course);
  }
}

  loadCourses() {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  loadCalls(courseId: number) {
    this.callsService.getCallByCourse(courseId).subscribe(calls => {
      console.log('Calls for Course Id:', courseId, calls);
      this.selectedCourse.calls = calls;
    });
  }

  onCallStatusChange(call: any) {
    this.callsService.updateCall(call.id, call.is_present).subscribe(response => {
      console.log(response);
    });
  }

  onConfirmButtonClick() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir mettre à jour l’appels',
      accept: () => {
        this.callsService.updateCallStatus(this.selectedCourse.id, this.selectedCourse.calls).subscribe(
          (response) => {
            console.log('Mise à jour réussie :', response);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour :', error);
          }
        );
      },
    });
  }
}
