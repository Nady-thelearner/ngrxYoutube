import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { AuthResponseData } from '../model/authResData.model';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loginSuccess, logout } from '../auth/state/auth.action';
import { setAuth } from '../store/shared.action';
import { Router } from '@angular/router';
import { isUserAuth } from '../store/shared.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading: boolean;
  tokenExpirationTimer: any;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private route: Router
  ) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    console.log('Auth SF called');

    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= ${enviroment.API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  autoLogin() {
    console.log('auto login called');
    const userData1: {
      email: string;
      token: string;
      localId: string;
      expirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData1) {
      return;
    }

    const user = new User(
      userData1.email,
      userData1.token,
      userData1.localId,
      new Date(userData1.expirationDate)
    );

    if (user.token1) {
      this.store.dispatch(loginSuccess({ user }));
      const expirationDur =
        new Date(userData1.expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDur);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log('auto logout called');
    this.tokenExpirationTimer = setTimeout(() => {
      this.onLogout();
      this.route.navigate(['/auth']);
    }, expirationDuration);

    console.log('Auth Service timer', this.tokenExpirationTimer);
  }

  formatUser(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    console.log('format user called ');
    const user = new User(
      resData.email,
      resData.idToken,
      resData.localId,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    return user;
  }

  signup(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${enviroment.API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  handleError(errorRes: HttpErrorResponse) {
    console.log('handle error called ', errorRes);
    let errorMessage = 'Unknown Error Occured!!';
    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Please enter valid email.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Please enter valid password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User account has been suspended.';
        break;
    }
    return errorMessage;
  }

  onLogout() {
    console.log('logout called');
    this.store
      .select(isUserAuth)
      .subscribe((data) => console.log('auhthenticated ??', data));
    this.store.dispatch(setAuth({ isauth: false }));
    this.store.dispatch(logout());
    localStorage.removeItem('userData');
  }
}
