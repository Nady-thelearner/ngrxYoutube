import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { state } from '@angular/animations';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsLogin = createSelector(
  getAuthState,
  (state) => state.islogin
);

export const getUser = createSelector(getAuthState, (state) => state.user);
