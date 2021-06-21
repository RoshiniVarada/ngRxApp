import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/types/user';
import { ActionTypes } from '../actionTypes';
import { ServiceErrors } from 'src/app/shared/types/serviceErrors';
import { LoginRequest } from '../../types/loginRequest';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequest }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: ServiceErrors }>()
);
