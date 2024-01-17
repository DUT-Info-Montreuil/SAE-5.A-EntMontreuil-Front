import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { jwtDecode } from "jwt-decode";

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

    // Récupérer les informations de l'utilisateur
    getUserInfo(): Observable<any> {
        return this.http.get<any>(this.apiURL + '/user/info', this.httpOptions)
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

    getRefreshToken(): string {
        return localStorage.getItem('refreshToken') || '';
    }

    getIsAdmin(): boolean {
        const token = this.getToken();
        if (!token) {
            return false; // Gérer l'absence de jeton
        }
        const decodedToken = jwtDecode<JwtPayload>(token);

        const isAdmin = decodedToken.sub.isAdmin;

        return isAdmin;
    }

    getRole(): string {
        const token = this.getToken();
        if (!token) {
            return ''; // Gérer l'absence de jeton
        }
        const decodedToken = jwtDecode<JwtPayload>(token);

        const role = decodedToken.sub.role;

        return role;
    }


    setToken(authToken: string): void {
        localStorage.setItem('authToken', authToken);
    }

    getFirstname(): string {
        const token = this.getToken();
        if (!token) {
            return ''; // Gérer l'absence de jeton
        }
        const decodedToken = jwtDecode<JwtPayload>(token);

        const role = decodedToken.sub.first_name;

        return role;
    }

    getLastname(): string {
        const token = this.getToken();
        if (!token) {
            return ''; // Gérer l'absence de jeton
        }
        const decodedToken = jwtDecode<JwtPayload>(token);

        const lastname = decodedToken.sub.last_name;

        return lastname;
    }

    getUserId(): number {
        const token = this.getToken();
        if (!token) {
            return 0; // Gérer l'absence de jeton
        }
        const decodedToken = jwtDecode<JwtPayload>(token);

        const id = decodedToken.sub.id;

        return id;
    }

    logout(): void {
        localStorage.clear();
    }
}


interface JwtPayload {
    sub: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        role: string;
        isAdmin: boolean;
    };
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