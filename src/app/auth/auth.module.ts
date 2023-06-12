import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    children: [
      { path: 'login', component: LoginComponent },

    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME , AuthReducer),
    RouterModule.forChild(routes),

  ],
})
export class AuthModule {}
