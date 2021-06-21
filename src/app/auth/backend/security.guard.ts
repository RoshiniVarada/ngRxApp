import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from '../store/selectors';



@Injectable({ providedIn: 'root' })
export class SecurityGuard implements CanActivate {
    constructor(
        private router: Router,
        private store:Store
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const loggedIn  = localStorage.getItem("token");
        if (loggedIn) {
          this.router.navigate(['/dashboard'], { queryParams: {  } });
            return false;
        }
        return true;
    }
}