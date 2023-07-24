import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import {
  addClicked,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPostSuccess,
  updClicked,
  updatePost,
  updatePostSuccess,
} from './posts.action';

const _postreducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    console.log('addPostSuccess reducer called');
    let post = { ...action.post };
    // post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  //updatePost
  on(updatePostSuccess, (state, action) => {
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

  on(deletePostSuccess, (state, { id }) => {
    // console.log('state', state, 'action', action);
    let updatedPosts = state.posts.filter((post) => {
      return post.id !== id;
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
  }),
  on(loadPostSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postReducer(state, action) {
  return _postreducer(state, action);
}
