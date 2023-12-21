import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Call } from "../models/calls.model";
import { formatDate } from "@angular/common";

@Injectable({
    providedIn: "root"
})
export class CallsService {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    getCallById(callId: number): Observable<Call> {
        return this.http.get<Call>(`${this.apiURL}/calls/${callId}`, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    updateCall(callId: number, isPresent: boolean): Observable<any> {
        return this.http.put<any>(`${this.apiURL}/calls/${callId}`, { is_present: isPresent }, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    addCall(idCourse: number, idStudent: number, isPresent: boolean): Observable<any> {
        return this.http.post<any>(`${this.apiURL}/calls`, { id_Course: idCourse, id_Student: idStudent, is_present: isPresent }, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    deleteCall(callId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL}/calls/${callId}`, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getStudentsForCall(callType: string, callId: number): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/calls/students/${callType}/${callId}`, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    updateCallStatus(idCourse: number, studentStatuses: any[]): Observable<any> {
        return this.http.put<any>(`${this.apiURL}/calls/status/${idCourse}`, studentStatuses, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getCallByCourse(courseId: number): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/calls/courses/${courseId}`);
      }
    errorHandler(error: any) {
        return throwError(error);
    }
    
    getCallsForDate(date: Date): Observable<Call[]> {
        const formattedDate = formatDate(date, 'yyyy-MM-dd', 'FR-fr');
        return this.http.get<Call[]>(`${this.apiURL}/calls/day/${formattedDate}`);
      }
}
