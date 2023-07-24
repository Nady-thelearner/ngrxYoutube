import { createAction, props } from '@ngrx/store';
import { Posts } from 'src/app/model/post.model';

export const ADD_POST_ACTION = 'ADD POST';
export const ADD_POST_SUCESS_ACTION = 'ADD POST SUCESS';
export const UPDATE_POST_ACTION = 'UPDATE POST';
export const UPDATE_POST_SUCCESS = 'UPDATE POST SUCCESS';
export const DELETE_POST_ACTION = 'DELETE POST';
export const DELETE_POST_SUCCESS = 'DELETE POST SUCCESS';
export const LOAD_POST = 'LOAD POSTS';
export const LOAD_POST_SUCCESS = 'LOAD POSTS SUCCESS';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Posts }>());
export const addPostSuccess = createAction(
  ADD_POST_SUCESS_ACTION,
  props<{ post: Posts }>()
);
export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Posts }>()
);

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Posts }>()
);

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id : string }>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id : string}>()
);

export const addClicked = createAction('ADD_CLICKED');
export const updClicked = createAction('UPD_CLICKED');

export const loadPosts = createAction(LOAD_POST);
export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ posts: Posts[] }>()
);
