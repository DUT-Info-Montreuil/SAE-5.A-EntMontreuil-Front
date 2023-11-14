import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let timeout: number | undefined; // Modifier ici

    // Définir un délai pour afficher la topbar
    timeout = window.setTimeout(() => {
      topbar.show();
    }, 500);

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (timeout !== undefined) {
              clearTimeout(timeout);
              topbar.hide();
            }
          }
        },
        (error: HttpErrorResponse) => {
          if (timeout !== undefined) {
            clearTimeout(timeout);
            topbar.hide();
          }
        }
      )
    );
  }
}
