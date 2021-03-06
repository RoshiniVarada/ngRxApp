import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { User } from 'src/app/shared/types/user';
import { AuthService } from '../../services/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.actions';


@Injectable()
export class LoginEffect {
constructor(private actions$: Actions,
  private router:Router,
   private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((user: User) => {
            this.router.navigate(['/dashboard']);
            return loginSuccessAction({user})
          }),

          catchError((errorResponse:HttpErrorResponse) => {
            return of(loginFailureAction({errors:errorResponse.error}))
          })
        )
      })
    )
  )
  

  
}