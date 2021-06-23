import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthenticationService } from './admin-authentication.service';
import { AuthenticationService } from './authentication.service';
import { ProfileService } from './profile.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AdminAuthenticationService,
        private toastr:ToastrService,
        private user_role:ProfileService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAdmin = this.authenticationService.currentAdminValue;

         let userInstance:any

        if (currentAdmin) {
            // logged in so return true
            return true;
        }

        this.toastr.info('Kindly login to proceed')
        // not logged in so redirect to login page with the return url
        //
        this.router.navigate(['/adminlogin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}