import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
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

    errorHandler(error: any) {
        return throwError(error);
    }

    addTeacher(username: string,  first_name: string,last_name: string, email: string, desktop: string,isAdmin: boolean,password: string, initial:string, isTTManager:boolean) : Observable<any>{
        
        return this.http.post<any>(this.apiURL + '/teachers', JSON.stringify({ "datas" : {"user" : {username,first_name ,last_name,email,password,isAdmin, isTTManager}, initial , desktop}}), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        );
    }

    updateTeacher(username: string,  first_name: string,last_name: string, email: string, id:number, oldUsername:string, initial : string, old_initial:string, isAdmin:boolean, desktop:string, isTTManager:boolean) : Observable<any>{
        
        return this.http.patch<any>(this.apiURL + `/teachers/${id}`, JSON.stringify({ "datas" : {"user" : {username,first_name ,last_name,email,oldUsername,isAdmin,isTTManager },initial, desktop, old_initial}}), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        );
    }

    deleteTeacher(id:number) : Observable<any>{
        return this.http.delete<any>(this.apiURL + `/teachers/${id}`)
        .pipe(
            catchError(this.errorHandler)
        );
    }
}
