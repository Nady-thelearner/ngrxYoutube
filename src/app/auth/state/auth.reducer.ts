import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginClicked, loginSuccess, logout } from './auth.action';


const _authReducer = createReducer(
  initialState,
  on(loginClicked, (state) => {
    return {
      ...state,
      islogin: !state.islogin,
    };
  }),

  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
