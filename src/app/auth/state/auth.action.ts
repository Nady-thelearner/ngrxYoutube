import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const LOGIN_START = 'Login Start';
export const LOGIN_SUCCESS = 'Login Sucess';
export const LOGIN_FAIL = 'Login fialed';
export const SIGN_UP_START = 'Signup Start';
export const LOGOUT = 'Logout Start';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const signUpStart = createAction(
  SIGN_UP_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const logout = createAction(LOGOUT);

export const loginClicked = createAction('LOGIN BTN CLICKED');
