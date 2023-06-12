export interface sharedState {
  showLoading: boolean;
  isAuthenticated: boolean;
  errorMessage: string;
}

export const initialState: sharedState = {
  showLoading: false,
  isAuthenticated: false,
  errorMessage: '',
};
