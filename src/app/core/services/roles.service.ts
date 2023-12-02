import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from "rxjs";;
import { Role } from "../models/role.model";

@Injectable({
    providedIn: "root"
})
export class RolesService implements OnInit {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiURL + '/roles/not_student_teacher', this.httpOptions)
    }
}
