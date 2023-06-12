import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SHARED_STATE_NAME,
  getErrorMessage,
  getLoader,
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

  constructor(private store: Store, private authSF: AuthService) {}

  ngOnInit(): void {
    this.authSF.autoLogin();
    this.store.select(getLoader).subscribe((data) => (this.isLoading = data));
    this.store.select(getErrorMessage).subscribe((data) => {
      this.error = data;
    });
  }
  onIconClick() {
    this.error = '';
  }
}
