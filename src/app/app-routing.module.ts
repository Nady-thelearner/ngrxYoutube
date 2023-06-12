import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter/counter.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

import { LoginComponent } from './auth/login/login.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { canActivate } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [canActivate] },
  { path: 'counter', component: CounterComponent, canActivate: [canActivate] },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [canActivate],
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: AddPostComponent },
    ],
  },
  {
    path: 'auth',
    component: LoginComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class appRoutingModule {}
