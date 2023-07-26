import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CounterButtoonsComponent } from './counter/counter-buttoons/counter-buttoons.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';

import { SustomeCounterInputComponent } from './counter/sustome-counter-input/sustome-counter-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { appRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/app.state';

import { LoginComponent } from './auth/login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';

import { AddPostComponent } from './posts/add-post/add-post.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PostEffects } from './posts/state/post.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serialize';
import { SinglePostComponent } from './posts/single-post/single-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtoonsComponent,
    CounterOutputComponent,
    SustomeCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostsListComponent,
    AddPostComponent,
    LoginComponent,
    SpinnerComponent,
    SinglePostComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AuthModule,

    BrowserAnimationsModule,

    // EffectsModule.forRoot([]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    EffectsModule.forRoot([PostEffects]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
