import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SigningService } from '../services/signing.service';

@Injectable({
  providedIn: 'root'
})
export class SigningGuard implements CanActivate {

  constructor(private signingService: SigningService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.signingService.isLoggin().pipe(
      take(1),
      map(loggedIn => {
        if (loggedIn) {
          console.log(loggedIn)
          return true;
        } else {
          console.log(loggedIn)
          this.router.navigate(['/signing']);
          return false;
        }
      })
    );
  }
}
