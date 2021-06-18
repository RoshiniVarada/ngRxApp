import { createAction, props } from '@ngrx/store';
import { RegisterRequest } from '../../types/registerRequest';
import { User } from '../../../shared/types/user';
import { ActionTypes } from '../actionTypes';
import { ServiceErrors } from 'src/app/shared/types/serviceErrors';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequest }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ user: User }>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: ServiceErrors }>()
);
