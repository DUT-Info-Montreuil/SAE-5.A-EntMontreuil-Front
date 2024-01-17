import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Exclure la requête de rafraîchissement du token pour ces deux cas :
        if (!this.auth.isLoggedIn() || this.isRefreshTokenRequest(req)) {
            return next.handle(req);
        }

        const token = this.auth.getToken();
        const decodedToken = jwtDecode<JwtPayload>(token);
        const expirationDate = +decodedToken.exp! * 1000;
        const isTokenExpiringSoon = Date.now() > expirationDate - 2 * 60 * 1000;
        const isTokenAlreadyExpired = Date.now() > expirationDate;

        if (!isTokenAlreadyExpired && !isTokenExpiringSoon) {
            return next.handle(this.addTokenToRequest(req, token));
        }

        return this.auth.refreshToken().pipe(
            switchMap((newToken: string) => {
                this.auth.setToken(newToken);
                return next.handle(this.addTokenToRequest(req, newToken));
            }),
            catchError(error => {
                this.auth.logout();
                this.router.navigateByUrl('/login');
                return throwError(error);
            })
        );
    }

    private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    private isRefreshTokenRequest(request: HttpRequest<any>): boolean {
        return request.url.includes('/refresh_token');
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