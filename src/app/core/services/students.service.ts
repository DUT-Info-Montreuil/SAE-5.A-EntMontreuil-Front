import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
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
}
