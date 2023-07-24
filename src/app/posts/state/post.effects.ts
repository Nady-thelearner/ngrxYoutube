import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PostStorageService } from 'src/app/service/post.service';
import { AppState } from 'src/app/store/app.state';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPostSuccess,
  loadPosts,
  updatePost,
  updatePostSuccess,
} from './posts.action';
import { EMPTY, exhaustMap, mergeMap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostEffects {
  constructor(
    private postSF: PostStorageService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  addPost$ = createEffect(() => {
    console.log('add post effect trigggered');
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postSF.storePost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  getPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postSF.fetchPosts().pipe(
          map((posts) => {
            console.log('effect triggered', posts);
            return loadPostSuccess({ posts });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    console.log('update action post effect trigggered');
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postSF.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postSF.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
