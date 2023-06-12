import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/auth/state/auth.action';
import { AuthService } from 'src/app/service/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setAuth } from 'src/app/store/shared.action';
import { getLoader, isUserAuth } from 'src/app/store/shared.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoginClckd: boolean;
  isLoading: boolean;
  authenticated: boolean;
  constructor(private store: Store<AppState>, private AuthSF: AuthService) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((data) => {
      this.isLoginClckd = data.islogin;
      const user = data.user;
      if (user != null) {
        // this.authenticated = true;
        this.store.dispatch(setAuth({ isauth: true }));
        this.store
          .select(isUserAuth)
          .subscribe((data) => (this.authenticated = data));
      } else {
        this.store
          .select(isUserAuth)
          .subscribe((data) => (this.authenticated = data));
      }
    });
    this.store.select(getLoader).subscribe((data) => (this.isLoading = data));
  }

  onLogout() {
    this.AuthSF.onLogout();
  }
}
