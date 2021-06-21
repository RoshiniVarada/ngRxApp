import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from 'src/app/shared/types/user';
import { authResponse } from '../types/authResponse';
import { ServiceErrors } from 'src/app/shared/types/serviceErrors';

let data: any = localStorage.getItem('users');
data = data ? JSON.parse(data) : [];
const users: User[] = data;

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        default:
          return next.handle(request);
      }
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorized' } });
    }

    function isLoggedIn() {
      return localStorage.getItem('token');
    }

    function register() {
      const user = body.user;
      const finduser = users.find((x) => x.username === user.username);
      if (finduser) return error('is already registered');
      return ok({
        user: {
          id: users.length + 1,
          username: user.username,
          email: user.email,
          token: user.username + 'fake-jwt-token',
        },
      });
    }

    function authenticate() {
      const user = body.user;
      const data = isLoggedIn() ? true : false;
      let userdata :any;
      if (!data) {
        const finduser = users.find(
          (x) => x.username === user.username
        );
         userdata = users.filter(
          (x) => x.username === user.username
        );
       
        if(finduser){
          console.log(userdata)
          return oklogin({
            user: {
              id: userdata.id,
              username: user.username,
              email: user.email,
              token: user.username + 'fake-jwt-token',
            },
          });
        }else{
          return error('not found');
        }

      } else {
        return unauthorized();
      }
    }

    function ok(body: authResponse) {
      users.push(body.user);
      localStorage.setItem('users', JSON.stringify(users));
      return of(new HttpResponse({ status: 200, body }));
    }
    function oklogin(body: authResponse) {
      localStorage.setItem('token', body.user.token);
        return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string | ServiceErrors) {
      let errors = { error: {} };
      if (typeof message == 'string') {
        errors.error = { user: message };
      }
      return throwError(errors);
    }
  }
}

export let backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true,
};
