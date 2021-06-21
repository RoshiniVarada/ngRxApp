import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { User } from 'src/app/shared/types/user';
import { AuthService } from '../../services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.actions';

@Injectable()
export class RegisterEffect {
constructor(private actions$: Actions,
  private router:Router,
   private authService: AuthService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((user: User) => {
            this.router.navigate(['/dashboard']);
            return registerSuccessAction({user})
          }),

          catchError((errorResponse:HttpErrorResponse) => {
            return of(registerFailureAction({errors:errorResponse.error}))
          })
        )
      })
    )
  )
  

  
}