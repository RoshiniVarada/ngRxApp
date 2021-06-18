import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appState } from 'src/app/shared/types/appState';
import { authState } from '../types/authState';

export const authFeatureSelector =
  createFeatureSelector<appState, authState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: authState) => authState.isSubmitting
);
