import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, throwError } from 'rxjs';
import { Posts } from 'src/app/model/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from '../state/posts.selector';
import {
  addClicked,
  deletePost,
  loadPosts,
  updClicked,
} from '../state/posts.action';
import { Router } from '@angular/router';


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
    this.store.dispatch(loadPosts());
  }

  isClickedSF() {
    this.store.dispatch(addClicked());
  }
  isUpdClickedSF() {
    this.store.dispatch(updClicked());

    console.log('post in post list', this.posts);
  }

  isDeletePost(id: string) {
    this.router.navigate(['/posts']);

    // this.subscription = this.store
    //   .select(getPostbyID(id))
    //   .subscribe((post) => (this.onePost = post));

    // console.log('onePost', this.onePost);
    if (confirm('Are you sure you want to delete ?')) {
      this.store.dispatch(deletePost({ id }));
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
