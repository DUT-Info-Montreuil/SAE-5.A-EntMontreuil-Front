import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.apiURL + '/authentification', JSON.stringify({ username, password }), this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    errorHandler(error: any) {
        return throwError(error);
    }

    getToken(): string {
        return localStorage.getItem('authToken') || '';
    }

    logout(): void {
        localStorage.removeItem('authToken');
    }
}
