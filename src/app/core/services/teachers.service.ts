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

    getAllTeachers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiURL + '/teachers?output_format=model', this.httpOptions)
    }

    errorHandler(error: any) {
        return throwError(error);
    }

    getIdTeacherByIdUser(id_user: number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/getbyiduser/${id_user}`, this.httpOptions)
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

    getTeacherPromotions(teacher_id: number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${teacher_id}/promotions`, this.httpOptions)
    }

    /**************************************HOURS & STATISTICS***********************************************/

    getHoursNumber(id:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id}/hours`, this.httpOptions)
    }

    getNumberOfHoursLeft(id:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id}/hoursleft`, this.httpOptions)
    }

    getNumberOfHoursPassed(id:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id}/hourspassed`, this.httpOptions)
    }

    /***************************************************************************************************************************/

    getHoursByMonth(id:number,year:string,month:string): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id}/hours/${year}/${month}`, this.httpOptions)
    }

    getLeftHoursByMonth(id:number,year:string,month:string): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id}/hoursleft/${year}/${month}`, this.httpOptions)
    }

    getPassedHoursByMonth(id:number,year:string,month:string): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id}/hourspassed/${year}/${month}`, this.httpOptions)
    }

    /***************************************************************************************************************************/


    getHoursByResource(id_teacher:number,id_resource:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id_teacher}/hours/${id_resource}`, this.httpOptions)
    }

    getLeftHoursByResource(id_teacher:number,id_resource:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id_teacher}/hoursleft/${id_resource}`, this.httpOptions)
    }

    getPassedHoursByResource(id_teacher:number,id_resource:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id_teacher}/hourspassed/${id_resource}`, this.httpOptions)
    }

    /***************************************************************************************************************************/

    getHoursByPromotion(id_teacher:number,id_promotion:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id_teacher}/hours/promotion/${id_promotion}`, this.httpOptions)
    }

    getLeftHoursByPromotion(id_teacher:number,id_promotion:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id_teacher}/hoursleft/promotion/${id_promotion}`, this.httpOptions)
    }

    getPassedHoursByPromotion(id_teacher:number,id_promotion:number): Observable<any> {
        return this.http.get<any>(this.apiURL + `/teachers/${id_teacher}/hourspassed/promotion/${id_promotion}`, this.httpOptions)
    }


}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/