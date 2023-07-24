import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './posts.state';

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostbyID = (id: string) =>
  createSelector(getPostsState, (state: PostState) =>
    state.posts.find((post) => post.id === id)
  );

export const getButtonClicked = createSelector(
  getPostsState,
  (state) => state.isClicked
);
export const updateButtonClicked = createSelector(
  getPostsState,
  (state) => state.updClicked
);
