import { AuthReducer } from '../auth/state/auth.reducer';
import { AuthState } from '../auth/state/auth.state';
import { counterReducer } from '../counter/state/counter.reducer';
import { CounterState } from '../counter/state/counter.state';
import { postReducer } from '../posts/state/posts.reducer';
import { PostState } from '../posts/state/posts.state';
import { SharedReducer } from './shared.reducer';
import { SHARED_STATE_NAME } from './shared.selector';
import { sharedState } from './shared.state';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface AppState {
  counter: CounterState;
  posts: PostState;
  auth: AuthState;
  [SHARED_STATE_NAME]: sharedState;
  router: RouterReducerState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postReducer,
  auth: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer,
  router: routerReducer,
};
