import { HttpInterceptor, HttpHandler, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
              let errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            // TODO make this more user friendly
            window.alert(errorMessage);
            return throwError(errorMessage);
          })
        )
    }
}