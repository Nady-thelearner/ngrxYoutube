import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, throwError } from 'rxjs';
import { Posts } from 'src/app/model/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPostbyID, getPosts } from '../state/posts.selector';
import { addClicked, deletePost, updClicked } from '../state/posts.action';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Observable<Posts[]>;
  constructor(private store: Store<AppState>, private router: Router) {}
  onePost: Posts;
  subscription: Subscription;
  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  isClickedSF() {
    this.store.dispatch(addClicked());
  }
  isUpdClickedSF() {
    this.store.dispatch(updClicked());

    // console.log('post in post list' , this.posts)
  }

  isDeletePost(id: number) {
    this.router.navigate(['/posts']);
    console.log('delete post called', id);

    this.subscription = this.store
      .select(getPostbyID(id))
      .subscribe((post) => (this.onePost = post));

    console.log('onePost', this.onePost);
    this.store.dispatch(deletePost({ post: this.onePost }));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
