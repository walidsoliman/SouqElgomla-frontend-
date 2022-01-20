import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../Models/profile';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any> {

  constructor(private authService: AuthServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.authService.getCurrentUser();
  }
}
