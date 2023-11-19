import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Ajouter le header Authorization seulement si l'utilisateur est authentifié
        if (this.auth.isLoggedIn()) {
            const headers = req.headers
                .append('Authorization', `Bearer ${this.auth.getToken()}`);

            const modifiedReq = req.clone({ headers });
            return next.handle(modifiedReq);
        }

        return next.handle(req);
    }
}
