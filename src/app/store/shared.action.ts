import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[Shared State] loading Spinner';
export const SET_AUTH = '[Shared State] set auth';
export const SET_ERROR_MSG = '[Shared State] Error message';
export const SET_SUCCESS_MSG = '[Shared State] Success message';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setAuth = createAction(SET_AUTH, props<{ isauth: boolean }>());

export const setErrorMsg = createAction(
  SET_ERROR_MSG,
  props<{ message: string }>()
);

export const setSuccessMsg = createAction(
  SET_SUCCESS_MSG,
  props<{ message: string }>()
);
