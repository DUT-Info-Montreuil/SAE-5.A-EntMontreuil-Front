import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(
      `${this.apiURL}/promotions`,
      this.httpOptions
    );
  }

  getAllCourses(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/courses`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCourseByPromotion(
    promotionId: number,
    semester: number
  ): Observable<Course[]> {
    return this.http
      .get<Course[]>(
        `${this.apiURL}/courses/promotion/${promotionId}/${semester}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getCourseByTraining(trainingID: number): Observable<Course[]> {
    return this.http
      .get<Course[]>(
        `${this.apiURL}/courses/training/${trainingID}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getCourseByTeacher(
    username: string
  ): Observable<Course[]> {
    return this.http
      .get<Course[]>(
        `${this.apiURL}/courses/teacher/${username}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }


  getCourseByTD(IDtd: number): Observable<Course[]> {
    return this.http
      .get<Course[]>(`${this.apiURL}/courses/td/${IDtd}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCourseByTp(IDtp: number): Observable<Course[]> {
    return this.http
      .get<Course[]>(`${this.apiURL}/courses/tp/${IDtp}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/courses/id/${courseId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addCourse(courseData: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiURL}/courses`, courseData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateCourse(courseId: number, courseData: any): Observable<any> {
    return this.http
      .patch<any>(
        `${this.apiURL}/courses/${courseId}`,
        courseData,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiURL}/courses/id/${courseId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Une erreur s’est produite', error);
    return throwError(error);
  }

  getTrainingOfPromo(idPromo: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiURL}/promotions/trainings/${idPromo}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getTrainingByPromotionAndSemester(
    idPromotion: number,
    semester: number
  ): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/trainings/${idPromotion}/${semester}`,
      this.httpOptions
    );
  }

  getGroupName(id_group: number, groupType: string): Observable<any> {
    console.log('getGroupName', id_group, groupType);
    let endpoint: string;
    switch (groupType) {
      case 'promotion':
        endpoint = `${this.apiURL}/promotions/${id_group}`;
        break;
      case 'training':
        endpoint = `${this.apiURL}/trainings/${id_group}`;
        break;
      case 'td':
        endpoint = `${this.apiURL}/td/${id_group}`;
        break;
      case 'tp':
        endpoint = `${this.apiURL}/tp/${id_group}`;
        break;
      default:
        throw new Error(`Type de groupe non pris en charge: ${groupType}`);
    }

    return this.http.get<any>(endpoint, this.httpOptions).pipe(
      catchError(this.handleError),
      switchMap((promotionResponse) => {
        if (groupType === 'promotion' && promotionResponse.id_Degree) {
          // Requête supplémentaire pour obtenir le nom du diplôme
          return this.http
            .get<any>(
              `${this.apiURL}/degrees/${promotionResponse.id_Degree}`,
              this.httpOptions
            )
            .pipe(
              map((degreeResponse) => {
                return `BUT ${promotionResponse.level} : ${promotionResponse.year} : ${degreeResponse.name}`;
              }),
              catchError(this.handleError)
            );
        } else {
          return of(promotionResponse.name);
        }
      })
    );
  }
}
