import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

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

  getCourseByPromotion(promotionId: number): Observable<Course[]> {
    return this.http
      .get<Course[]>(
        `${this.apiURL}/courses/promotion/${promotionId}`,
        this.httpOptions
      )
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
}
