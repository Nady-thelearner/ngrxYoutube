import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import {
  loginClicked,
  loginStart,
  loginSuccess,
  signUpStart,
} from './auth.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setErrorMsg,
  setLoadingSpinner,
  setSuccessMsg,
} from 'src/app/store/shared.action';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private AuthSF: AuthService,
    private store: Store<AppState>,
    private route: Router
  ) {}
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),

      exhaustMap((action) => {
        console.log('Auth Effects called', action);
        return this.AuthSF.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.AuthSF.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMsg({ message: '' }));
            this.route.navigate(['']);
            this.AuthSF.autoLogout(+data.expiresIn * 1000);
            return loginSuccess({ user });
          }),
          catchError((err) => {
            const error = this.handleError(err);
            this.store.dispatch(setErrorMsg({ message: error }));
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of();
          })
        );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),

      exhaustMap((action) => {
        console.log('Auth Effects called', action);
        return this.AuthSF.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(
              setSuccessMsg({
                message: 'Sign-up Successfull , Please Login to continue.',
              })
            );
            this.route.navigate(['/auth']);
            this.store.dispatch(loginClicked());

            return loginSuccess(null);
          }),
          catchError((err) => {
            const error = this.handleError(err);
            this.store.dispatch(setErrorMsg({ message: error }));
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of();
          })
        );
      })
    );
  });
  //catchError(this.handleError),
  private handleError(errorRes: HttpErrorResponse) {
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
}
