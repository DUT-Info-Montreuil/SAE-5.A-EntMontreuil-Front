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

    getIsAdmin(): string {
        return localStorage.getItem('isadmin') || '';
    }

    getRole(): string {
        const token = this.getToken();
        if (!token) {
            return ''; // Gérer l'absence de jeton
        }
        const decodedToken = jwtDecode<JwtPayload>(token);

        // Liste des rôles autorisés
        const validRoles = ['admin', 'user', 'teacher', 'student'];

        // Vérifier si le rôle extrait du jeton est l'un des rôles valides
        const role = validRoles.includes(decodedToken.sub.role) ? decodedToken.sub.role : '';

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

    getUserId(): string {
        return localStorage.getItem('id_user') || '';
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
    };
}
