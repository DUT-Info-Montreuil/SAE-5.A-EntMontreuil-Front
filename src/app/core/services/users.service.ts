import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class UsersService implements OnInit {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURL + '/users/user?output_format=model', this.httpOptions)
    }

    errorHandler(error: any) {
        return throwError(error);
    }

    addUser(username: string,  first_name: string,last_name: string, email: string, role: string,isAdmin: boolean,password: string) : Observable<any>{
        
        return this.http.post<any>(this.apiURL + '/users', JSON.stringify({ "datas" : {"user" : {username, password,first_name ,last_name,email,role,isAdmin}}}), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        );
    }


    updateUser(username: string,  first_name: string,last_name: string, email: string, role: string,isAdmin: boolean, id:number, oldUsername:string) : Observable<any>{
        
        return this.http.patch<any>(this.apiURL + `/users/${id}`, JSON.stringify({ "datas" : {"user" : {username,first_name ,last_name,email,role,isAdmin,oldUsername }}}), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        );
    }

    deleteUser( id:number) : Observable<any>{
        
        return this.http.delete<any>(this.apiURL + `/users/${id}`)
        .pipe(
            catchError(this.errorHandler)
        );
    }
        
    
}
