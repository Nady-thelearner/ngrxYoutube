import { User } from 'src/app/model/user.model';

export interface AuthState {
  islogin: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  islogin: false,
  user: null,
};
