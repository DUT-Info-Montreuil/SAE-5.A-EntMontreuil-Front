import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Classroom } from "../models/classroom.model";

@Injectable({
    providedIn: "root"
})
export class ClassroomService implements OnInit {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    getClassroomById(id:number): Observable<Classroom> {
        return this.http.get<Classroom>(`${this.apiURL}/classrooms/${id}`, this.httpOptions);
    }
    
}
