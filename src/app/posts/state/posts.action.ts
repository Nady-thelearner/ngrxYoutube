import { createAction, props } from '@ngrx/store';
import { Posts } from 'src/app/model/post.model';

export const ADD_POST_ACTION = 'ADD POST';
export const UPDATE_POST_ACTION = 'UPDATE POST';
export const DELETE_POST_ACTION = 'DELETE POST';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Posts }>());
export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Posts }>()
);

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ post: Posts }>()
);

export const addClicked = createAction('ADD_CLICKED');
export const updClicked = createAction('UPD_CLICKED');
