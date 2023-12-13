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
        return this.http.get<Role[]>(this.apiURL + '/roles', this.httpOptions)
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
