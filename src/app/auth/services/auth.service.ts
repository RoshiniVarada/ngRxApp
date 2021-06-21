import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterRequest } from '../types/registerRequest';
import { User } from '../../shared/types/user';
import { environment } from 'src/environments/environment';
import { authResponse } from '../types/authResponse';
import { LoginRequest } from '../types/loginRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register = (data: RegisterRequest): Observable<User> => {
    const url = `${environment.apiUrl}/users/register`;  
    return this.http
      .post<authResponse>(url, data)
      .pipe(map((response: authResponse) => response.user));
  };

  login = (data: LoginRequest): Observable<User> => {
    const url = `${environment.apiUrl}/users/authenticate`;  
    return this.http
      .post<authResponse>(url, data)
      .pipe(map((response: authResponse) => response.user));
  };
}
