import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _Router:Router, private _ToastrService: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err) {
          if (err.status === 400) {
            if (err.error.errors) {
              throw err.error;
            }else {
              this._ToastrService.error(err.error.message, err.error.statusCode)
            }
            this._ToastrService.error(err.error.message, err.error.statusCode)
          }
          if (err.status === 401) {
            this._ToastrService.error(err.error.message, err.error.statusCode)
          }
          if (err.status === 404) {
            this._Router.navigateByUrl('/not-found')
          }
          if (err.status === 500) {
            const navigationExtras: NavigationExtras = {
              state:{error:err.error}
            }
            this._Router.navigateByUrl('/server-error', navigationExtras)
          }
        }
          return throwError(() => err.message || 'Server Not Found');
      })
    );
  }
}
