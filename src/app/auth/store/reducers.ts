import { createReducer, on, Action } from '@ngrx/store';
import { authState } from '../types/authState';
import { registerAction } from './actions/register.actions';

const initialState: authState = {
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): authState => ({
      ...state,
      isSubmitting: true,
    })
  )
);

export function reducers(initialState: authState, action: Action) {
  return authReducer(initialState, action);
}
