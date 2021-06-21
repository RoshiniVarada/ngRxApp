import { createReducer, on, Action } from '@ngrx/store';
import { authState } from '../types/authState';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';

const initialState: authState = {
  isSubmitting: false,
  user:null,
  validationErrors:null,
  isLoggedIn:null
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): authState => ({
      ...state,
      isSubmitting: true,
      validationErrors:null,
    })
  ),
  on(
    registerSuccessAction,
    (state,action): authState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn:true,
      user:action.user,
    })
  ),
  on(
    registerFailureAction,
    (state,action): authState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn:false,
      validationErrors:action.errors
    })
  ),
  on(
    loginAction,
    (state): authState => ({
      ...state,
      isSubmitting: true,
      validationErrors:null,
    })
  ),
  on(
    loginSuccessAction,
    (state,action): authState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn:true,
      user:action.user,
    })
  ),
  on(
    loginFailureAction,
    (state,action): authState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn:false,
      validationErrors:action.errors
    })
  )
);

export function reducers(initialState: authState, action: Action) {
  return authReducer(initialState, action);
}
