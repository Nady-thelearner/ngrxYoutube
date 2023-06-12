import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import {
  addClicked,
  addPost,
  deletePost,
  updClicked,
  updatePost,
} from './posts.action';

const _postreducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  //updatePost
  on(updatePost, (state, action) => {
    let updatedPost = state.posts.map((post) =>
      action.post.id === post.id ? action.post : post
    );
    // post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(addClicked, (state) => {
    return {
      ...state,
      isClicked: true,
      updClicked: false,
    };
  }),

  on(deletePost, (state, action) => {
    console.log('state', state, 'action', action);
    let updatedPosts = state.posts.filter((post) => {
      if (action.post.id != post.id) {
        return post;
      }
    });

    return {
      ...state,
      posts: updatedPosts,
    };
  }),

  on(updClicked, (state) => {
    return {
      ...state,
      isClicked: false,
      updClicked: true,
    };
  })
);

export function postReducer(state, action) {
  return _postreducer(state, action);
}
