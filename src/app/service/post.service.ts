import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

import { Posts } from '../model/post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostStorageService {
  posts: Posts[];
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  storePost(post: Posts): Observable<{ name: string }> {
    console.log('post storage service called');
    return this.http.post<{ name: string }>(
      'https://ngrx-y-default-rtdb.firebaseio.com/post.json',
      post
    );
  }

  updatePost(post: Posts) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    console.log('update storage service called', postData);
    return this.http.patch<{ name: string }>(
      'https://ngrx-y-default-rtdb.firebaseio.com/post.json',
      postData
    );
  }

  deletePost(id: string) {
    console.log('deletePost triggered', id);
    return this.http.delete(
      `https://ngrx-y-default-rtdb.firebaseio.com/post/${id}.json`
    );
  }

  fetchPosts(): Observable<Posts[]> {
    return this.http
      .get('https://ngrx-y-default-rtdb.firebaseio.com/post.json')
      .pipe(
        map((data) => {
          const posts: Posts[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }
}
