import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuth = this.auth.getToken();
        const isAdmin = this.auth.getIsAdmin();

        // Si l'utilisateur est déjà authentifié et tente d'accéder à une route d'authentification
        if (isAuth && (state.url.startsWith('/auth'))) {
            this.router.navigateByUrl('/dashboard');
            return false;
        }

        // Si l'utilisateur n'est pas authentifié
        if (!isAuth && !(state.url.startsWith('/auth'))) {
            this.router.navigateByUrl('/auth/login');
            return false;
        }

        // Si l'utilisateur est authentifié mais n'est pas un administrateur et tente d'accéder à une route admin
        if (isAuth && !isAdmin && (state.url.startsWith('/admin'))) {
            this.router.navigateByUrl('/dashboard');
            return false;
        }

        return true;
    }
}
