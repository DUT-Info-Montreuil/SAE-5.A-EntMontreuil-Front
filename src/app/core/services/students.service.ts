import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Student } from "../models/students.model";

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

    addStudent(username: string,  first_name: string,last_name: string, email: string, ine: string,apprentice: boolean,nip: string) : Observable<any>{
        
        return this.http.post<any>(this.apiURL + '/students', JSON.stringify({ "datas" : {"user" : {username,first_name ,last_name,email}, apprentice , ine, nip}}), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        );
    }
}
