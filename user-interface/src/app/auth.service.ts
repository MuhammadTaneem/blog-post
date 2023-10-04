import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './auth/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BACKEND_URL = environment.apiUrl + 'auth/';

  isAuthenticated = false;
  uid!: any;
  token!: any;
  tokenTimer: any;
  haveToken = new Subject<boolean>();
  Loading = new Subject<boolean>();
  created = new Subject<boolean>();

  tokenTimeDuration = 7776000;

  error!: string[];
  constructor(
    private http: HttpClient,
    private snacbar: MatSnackBar,
    private router: Router
  ) {}

  changeEmail(new_email: string, current_password: string) {
    this.http
      .post<{}>(this.BACKEND_URL + 'users/set_email/', {
        new_email,
        current_password,
      })
      .subscribe(
        (HttpResponse) => {
          this.snacbar.open('email changed ', 'X', { duration: 2000 });
        },
        (error) => {
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          this.snacbar.open(err, 'X');
        }
      );
  }

  changePass(form: any) {
    this.http
      .post<{}>(this.BACKEND_URL + 'users/set_password/', form)
      .subscribe(
        (HttpResponse) => {
          this.snacbar.open('successfully changed your password ', 'X', {
            duration: 2000,
          });
          this.router.navigate(['/']);
        },
        (error) => {
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          err = err.slice(2, -4);
          this.snacbar.open(err, 'X');
        }
      );
  }

  resetPassword(email: string) {
    this.http
      .post<{}>(this.BACKEND_URL + 'users/reset_password/', {
        email: email,
      })
      .subscribe(
        (HttpResponse) => {
          this.created.next(true);
          this.Loading.next(false);
          this.snacbar.open('verify email send ', 'X');
        },
        (error) => {
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          err = err.slice(1, -1);

          this.snacbar.open(err, 'X');
        }
      );
  }

  // reset passwrod confirm
  resetPasswordConfrim(
    uid: string,
    token: string,
    new_password: string,
    re_new_password: string
  ) {
    this.http
      .post<{}>(this.BACKEND_URL + 'users/reset_password_confirm/', {
        uid: uid,
        token: token,
        new_password: new_password,
        re_new_password: re_new_password,
      })
      .subscribe(
        (HttpResponse) => {
          this.Loading.next(false);
          this.snacbar.open('login with new password', 'X', { duration: 2000 });
          this.router.navigate(['/login']);
        },
        (error) => {
          let err = JSON.stringify(error.error);
          this.Loading.next(false);
          err = err.split(':')[1];
          err = err.slice(1, -1);

          this.snacbar.open(err, 'X');
        }
      );
  }

  // resend email for  user activation

  resend(email: string) {
    this.http
      .post<{}>(this.BACKEND_URL + 'users/resend_activation/', {
        email: email,
      })
      .subscribe(
        (HttpResponse) => {
          this.created.next(true);
          this.Loading.next(false);
          this.snacbar.open('Activation email send ', 'X');

          // this.router.navigate(['/create']);
        },
        (error) => {
          let err = JSON.stringify(error.error);

          this.snacbar.open(err, 'X');
        }
      );
  }

  creatUser(user: User) {
    this.http
      .post<{ details: string }>(this.BACKEND_URL + 'users/', user)
      .subscribe(
        (HttpResponse) => {
          this.Loading.next(false);
          this.created.next(true);
          let msg = JSON.stringify(HttpResponse);
          msg = msg.split(':')[1];
          msg = msg.slice(1, -5);
          this.snacbar.open(msg + '. please verify from your email ', 'X');
          // this.router.navigate(['/create']);
        },
        (error) => {
          this.Loading.next(false);
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          err = err.slice(2, -4);
          this.snacbar.open(err, 'X');
        }
      );
  }

  userActivation(uid: string, token: string) {
    this.http
      .post<{ details: string }>(this.BACKEND_URL + 'users/activation/', {
        uid: uid,
        token: token,
      })
      .subscribe(
        (HttpResponse) => {
          this.Loading.next(false);
          this.created.next(true);
          this.snacbar.open('your account is activated ', 'X', {
            duration: 2000,
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.Loading.next(false);
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          err = err.slice(2, -1);
          this.snacbar.open(err, 'X');
        }
      );
  }

  login(email: string, password: string) {
    this.http
      .post<{ access: string; refresh: string }>(
        this.BACKEND_URL + 'jwt/create/',
        {
          email,
          password,
        }
      )
      .subscribe(
        (loginData) => {
          if (loginData.access) {
            this.snacbar.open('login success ', 'X', { duration: 2000 });

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + this.tokenTimeDuration * 1000
            );

            this.Loading.next(false);
            localStorage.setItem('token', loginData.access);
            // localStorage.setItem('uid', loginData.user.id);
            localStorage.setItem('expiration', expirationDate.toISOString());

            this.loadMe(loginData.access);
          }
        },
        (error) => {
          this.Loading.next(false);
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          // err = err.slice(2, -4);
          this.snacbar.open(err, 'X');
        }
      );
  }

  loadMe(access: string) {
    const headers = new HttpHeaders().set('Authorization', `jwt ${access}`);
    this.http
      .get<{ id: string; email: string }>(this.BACKEND_URL + 'users/me/', {
        headers: headers,
      })
      .subscribe((profileData) => {
        localStorage.setItem('uid', profileData.id);
        this.router.navigate(['/']);
      });
  }

  getUid() {
    return this.uid;
  }

  getToken() {
    return this.token;
  }

  authenticationStatus() {
    return this.isAuthenticated;
  }

  haveTokenLisenter() {
    return this.haveToken.asObservable();
  }

  logOut() {
    clearTimeout(this.tokenTimer);
    this.isAuthenticated = false;
    this.token = null;
    this.uid = null;
    localStorage.clear();
    this.haveToken.next(false);
    this.router.navigate(['/login']);
    this.snacbar.open('you are logged out  ', 'X', { duration: 2000 });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.uid = authInformation.uid;
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.haveToken.next(true);
      // this.setAuthTimer(expiresIn / 1000);
      this.setAuthTimer(expiresIn);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, 3600 * 24 * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    let expirationDate = localStorage.getItem('expiration');

    const uid = localStorage.getItem('uid');

    if (!token || !expirationDate) {
      return false;
    }
    return {
      token: token,
      uid: uid,
      expirationDate: new Date(expirationDate),
    };
  }

  isLoading() {
    return this.Loading.asObservable();
  }

  isCreated() {
    return this.created.asObservable();
  }
}
