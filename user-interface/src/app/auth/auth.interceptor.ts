import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  BACKEND_URL = environment.apiUrl + 'auth/';

  constructor(private authService: AuthService) {}

  freeurl: string[] = [
    this.BACKEND_URL + 'jwt/create/',
    this.BACKEND_URL + 'users/',
    this.BACKEND_URL + 'users/me/',
    this.BACKEND_URL + 'users/reset_password/',
    this.BACKEND_URL + 'users/resend_activation/',
    this.BACKEND_URL + 'users/activation/',
    this.BACKEND_URL + 'users/reset_password_confirm/',
  ];

  isfree(url: string) {
    for (let i = 0; i < this.freeurl.length; i++) {
      if (url == this.freeurl[i]) {
        return false;
      }
    }
    return true;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isfree(request.url)) {
      const authtoken = this.authService.getToken();
      request = request.clone({
        // headers: request.headers.set('Authorization', 'Bearer ' + authtoken)
        setHeaders: {
//           'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data; boundary=12345',
          // Accept: 'application/json',
          // Authorization: `Bearer ${authtoken}`,
          Authorization: `jwt ${authtoken}`,
        },
      });
    }

    return next.handle(request);
  }
}
