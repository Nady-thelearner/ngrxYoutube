import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SHARED_STATE_NAME,
  getErrorMessage,
  getLoader,
  getSuccessMessage,
} from './store/shared.selector';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngrx-counter';
  isLoading: boolean;
  error: string;
  success: string;
  alert: boolean;

  constructor(private store: Store, private authSF: AuthService) {}

  ngOnInit(): void {
    this.authSF.autoLogin();
    this.store.select(getLoader).subscribe((data) => (this.isLoading = data));
    this.store.select(getErrorMessage).subscribe((data) => {
      this.error = data;
    });
    this.store.select(getSuccessMessage).subscribe((data) => {
      this.success = data;
      if (this.success) {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    });
  }
  onIconClick() {
    this.error = '';
    this.success = '';
    this.alert = false;
  }
}
