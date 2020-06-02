import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { httpClient } from '@carol/carol-sdk/lib/http-client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private authService: AuthService) {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = httpClient.authToken;

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken.replace(/\"/g, ''))
      });

      return next.handle(cloned).pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            this.authService.goToLogin();
          }
          return throwError(error);
        })
      );
    } else {
      this.authService.goToLogin();
    }
  }
}
