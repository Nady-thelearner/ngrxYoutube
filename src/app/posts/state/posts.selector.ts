import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './posts.state';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { RouterStateUrl } from 'src/app/store/router/custom-serialize';

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, (state) => state.posts);

// export const getPostbyIDs = (id: string) =>
//   createSelector(getPostsState, (state: PostState) =>
//     state.posts.find((post) => post.id === id)
//   );

export const getPostbyID = createSelector(
  getPostsState,
  getCurrentRoute,
  (state: PostState, route: RouterStateUrl) =>
    state.posts
      ? state.posts.find((post) => post.id === route.params['id'])
      : null
);

export const getButtonClicked = createSelector(
  getPostsState,
  (state) => state.isClicked
);
export const updateButtonClicked = createSelector(
  getPostsState,
  (state) => state.updClicked
);
