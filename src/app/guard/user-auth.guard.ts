import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
        this.router.navigate(['/auth/login'], {
        queryParams: {returnUrl: state.url}
      });
      return false;
    }
  }
}
