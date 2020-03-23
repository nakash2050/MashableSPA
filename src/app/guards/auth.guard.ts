import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ROUTE_PATH } from '../constants/route-name.constant';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.loggedIn()) return true;

        this.router.navigate([ROUTE_PATH.AUTH.MAIN, ROUTE_PATH.AUTH.LOGIN], { queryParams: { returnUrl: state.url == '/' ? `${ROUTE_PATH.AUTH.MAIN} / ${ROUTE_PATH.AUTH.LOGIN}` : state.url } });
        return false;
    }
}