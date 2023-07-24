import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sharedState } from './shared.state';

export const SHARED_STATE_NAME = 'Shared';

const getSharedState = createFeatureSelector<sharedState>(SHARED_STATE_NAME);

export const getLoader = createSelector(
  getSharedState,
  (state) => state.showLoading
);

export const isUserAuth = createSelector(
  getSharedState,
  (state) => state.isAuthenticated
);

export const getErrorMessage = createSelector(
  getSharedState,
  (state) => state.errorMessage
);

export const getSuccessMessage = createSelector(
  getSharedState,
  (state) => state.successMessage
);
