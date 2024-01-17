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
        return this.http.get<Role[]>(this.apiURL + '/roles/nee', this.httpOptions)
    }

    addRole(name:string): Observable<any> {
        return this.http.post<any>(this.apiURL + '/roles', JSON.stringify({name}),this.httpOptions)
    }

    updateRole(name:string, id:number): Observable<Role> {
        return this.http.patch<Role>(this.apiURL + `/roles/${id}`, JSON.stringify({name}),this.httpOptions)
    }

    deleteRole(id:number): Observable<any> {
        return this.http.delete<any>(this.apiURL + `/roles/${id}`,this.httpOptions)
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