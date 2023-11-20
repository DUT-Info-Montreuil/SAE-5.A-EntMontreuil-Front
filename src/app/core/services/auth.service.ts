import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

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

    // Méthode pour rafraîchir le token d'accès
    refreshToken(): Observable<string> {
        const refreshToken = this.getRefreshToken();

        return this.http.get<any>(this.apiURL + '/refresh_token', {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${refreshToken}` }),
        }).pipe(
            map(response => response.new_access_token),
            catchError(error => {
                return throwError(error);
            })
        );
    }

    errorHandler(error: any) {
        return throwError(error);
    }

    getToken(): string {
        return localStorage.getItem('authToken') || '';
    }

    getRefreshToken(): string {
        return localStorage.getItem('refreshToken') || '';
    }

    setToken(authToken: string): void {
        localStorage.setItem('authToken', authToken);
    }

    getFirstname(): string {
        return localStorage.getItem('first_name') || '';
    }

    getLastname(): string {
        return localStorage.getItem('last_name') || '';
    }

    getUserId(): string {
        return localStorage.getItem('id_user') || '';
    }

    logout(): void {
        localStorage.clear();
    }
}
