import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, catchError, of } from 'rxjs';
import { AppState } from '../store/app.state';
import { getUser } from './state/auth.selector';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  return store.select(getUser).pipe(
    map((user) => {
      console.log('Guard called', user);
      if (user != null) {
        console.log('Guard called', user);
        return true;
      } else {
        router.navigate(['/auth']);
      }
    }),
    catchError(() => {
      router.navigate(['/auth']);
      return of(false);
    })
  );
};
