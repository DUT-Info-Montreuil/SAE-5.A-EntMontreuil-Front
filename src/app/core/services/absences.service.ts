import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Absence } from "../models/absence.model";

@Injectable({
    providedIn: "root"
})
export class AbsencesService {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    getStudentAbsences(): Observable<Absence[]> {
        return this.http.get<Absence[]>(this.apiURL + '/student/absences', this.httpOptions )
    }



}
