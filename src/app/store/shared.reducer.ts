import { state } from '@angular/animations';
import { createAction, createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import {
  setAuth,
  setErrorMsg,
  setLoadingSpinner,
  setSuccessMsg,
} from './shared.action';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setAuth, (state, action) => {
    return {
      ...state,
      isAuthenticated: action.isauth,
    };
  }),
  on(setErrorMsg, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(setSuccessMsg, (state, action) => {
    return {
      ...state,
      successMessage: action.message,
    };
  })
);

export function SharedReducer(state, action) {
  return _sharedReducer(state, action);
}
