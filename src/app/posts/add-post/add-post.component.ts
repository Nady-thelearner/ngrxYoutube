import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Posts } from 'src/app/model/post.model';
import { AppState } from 'src/app/store/app.state';
import { addPost, updatePost } from '../state/posts.action';
import {
  getButtonClicked,
  getPostbyID,
  getPosts,
  updateButtonClicked,
} from '../state/posts.selector';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  isClicked: boolean;
  updClicked: boolean;
  id: any;

  addBtnSubs: Subscription;
  updBtnSubs: Subscription;
  routeSubs: Subscription;
  storeSubs: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.addBtnSubs = this.store
      .select(getButtonClicked)
      .subscribe((data) => (this.isClicked = data));
    this.updBtnSubs = this.store
      .select(updateButtonClicked)
      .subscribe((data) => {
        this.updClicked = data;
        console.log('update in post add comp triggeered', this.updClicked);
      });

    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.minLength(6)]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    if (this.updClicked) {
      this.routeSubs = this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');
        console.log('Update clicked', this.id);
        this.storeSubs = this.store
          .select(getPostbyID(this.id))
          .subscribe((data) => {
            console.log('update data', data);
            this.postForm.patchValue(data);
          });
      });
    }
  }

  titleErrors() {
    const titleEl = this.postForm.get('title');
    if (titleEl.touched && !titleEl.valid) {
      if (titleEl.errors['required']) {
        return 'Title field cant be empty.';
      }
      if (titleEl.errors['minlength']) {
        return 'Title field lenght cant be less than 6';
      }
    }
  }

  descriptionError() {
    const descEl = this.postForm.get('description');
    if (descEl.touched && !descEl.valid) {
      if (descEl.errors['minlength']) {
        // console.log('inside if minlength');
        return 'Description field lenght cant be less than 10';
      }

      if (descEl.errors['required']) {
        console.log('inside if minlength');
        return 'Description field cant be empty.';
      }
    }
  }

  OnformSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Posts = {
      id: this.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    if (this.isClicked) {
      console.log('ellox  ');
      this.store.dispatch(addPost({ post }));
      this.postForm.reset();
    }

    if (this.updClicked) {
      this.store.dispatch(updatePost({ post }));
      this.postForm.reset();
    }
  }

  ngOnDestroy(): void {
    console.log('destroy called');
    this.addBtnSubs.unsubscribe();

    this.updBtnSubs.unsubscribe();
    if (this.storeSubs) {
      this.storeSubs.unsubscribe();
    }
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
  }
}
