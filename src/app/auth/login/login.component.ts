import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginClicked, loginStart, signUpStart } from '../state/auth.action';
import { Observable, Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/store/shared.action';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;
  loginClk$: Observable<any>;
  subscription: Subscription;
  loginClck: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    // this.loginClk$ = this.store.select('auth').subscribe();
    this.subscription = this.store
      .select('auth')
      .subscribe((data) => (this.loginClck = data.islogin));
  }

  emailError() {
    const emailEl = this.loginform.get('email');
    if (emailEl.touched && !emailEl.valid) {
      if (emailEl.errors['email']) {
        return 'Please enter a valid email';
      }

      if (emailEl.errors['required']) {
        return 'Email ID required.';
      }
    }
  }

  password() {
    const passEl = this.loginform.get('password');
    if (passEl.touched && !passEl.valid) {
      if (passEl.errors['required']) {
        return 'Password is required.';
      }
    }
  }

  OnformSubmit() {
    console.log('On form submit called ');
    const email = this.loginform.value.email;
    const password = this.loginform.value.password;
    console.log('On form submit called 2 ');

    if (this.loginClck) {
      console.log('login 123');
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(loginStart({ email, password }));
    } else {
      console.log('signup');
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(signUpStart({ email, password }));
    }
  }

  onSwitchMode() {
    this.store.dispatch(loginClicked());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
