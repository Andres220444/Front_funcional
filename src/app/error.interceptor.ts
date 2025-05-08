// error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status === 0) {
          this.snackBar.open('Error de conexión con el servidor', 'Cerrar', {
            duration: 7000,
            panelClass: ['error-snackbar']
          });
        } else if (error.status >= 500) {
          this.snackBar.open('Error interno del servidor', 'Cerrar', {
            duration: 7000,
            panelClass: ['error-snackbar']
          });
        }
        return throwError(() => error);
      })
    );
  }
}