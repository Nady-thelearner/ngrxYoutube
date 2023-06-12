import { Posts } from '../../model/post.model';

export interface PostState {
  posts: Posts[];
  isClicked: boolean;
  updClicked: boolean;
}

export const initialState: PostState = {
  posts: [
    { id: '1', title: 'teest 1', description: 'this is post' },
    { id: '2', title: 'teest 2', description: 'this is Another post' },
  ],
  isClicked: true,
  updClicked: false,
};
