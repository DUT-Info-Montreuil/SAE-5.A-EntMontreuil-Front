import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Student } from "../models/students.model";
import { StudentABS } from "../models/students-abs.model";

@Injectable({
    providedIn: "root"
})
export class StudentsService implements OnInit {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.apiURL + '/students?output_format=model', this.httpOptions)
    }

    errorHandler(error: any) {
        return throwError(error);
    }

    addStudent(username: string, first_name: string, last_name: string, email: string, ine: string, apprentice: boolean, nip: string): Observable<any> {

        return this.http.post<any>(this.apiURL + '/students', JSON.stringify({ "datas": { "user": { username, first_name, last_name, email }, apprentice, ine, nip } }), this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }


    updateStudent(username: string, first_name: string, last_name: string, email: string, id: number, oldUsername: string, nip: string, ine: string, apprentice: boolean, old_ine: string, old_nip: string): Observable<any> {
        return this.http.patch<any>(this.apiURL + `/students/${id}`, JSON.stringify({ "datas": { "user": { username, first_name, last_name, email, oldUsername }, apprentice, ine, nip, old_ine, old_nip } }), this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    deleteStudent(id: number): Observable<any> {
        return this.http.delete<any>(this.apiURL + `/students/${id}`)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    verifyCSV(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(this.apiURL + '/students/verify_csv', formData);
    }


    addStudentCSV(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(this.apiURL + '/students/add_csv', formData);
    }

    getStudentsByGroupType(group_type: string, group_id: number, course_id: number) {
        return this.http.get<StudentABS>(this.apiURL + "/students/group?groupType=" + group_type + "&id=" + group_id + "&courseId=" + course_id, this.httpOptions);
    }
}
