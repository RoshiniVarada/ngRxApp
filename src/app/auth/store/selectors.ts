import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appState } from 'src/app/shared/types/appState';
import { authState } from '../types/authState';

export const authFeatureSelector =
  createFeatureSelector<appState, authState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: authState) => authState.isSubmitting
);

export const loggedInUser = createSelector(
  authFeatureSelector,
  (authState: authState) => authState.user
);

export const isLoggedIn = createSelector(
  authFeatureSelector,
  (authState: authState) => authState.isLoggedIn
);
