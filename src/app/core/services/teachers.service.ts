import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Teacher } from "../models/teachers.model";

@Injectable({
    providedIn: "root"
})
export class TeachersService implements OnInit {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    getAllTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(this.apiURL + '/teachers?output_format=model', this.httpOptions)
    }
}
