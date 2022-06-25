import { AdminService } from './../../../core/services/admin.service';
import { JwtService } from './../../../core/services/jwt.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService   : JwtService,
    private adminService : AdminService,
    private router       : Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.jwtService.loggedIn()) {
        this.router.navigate(['/auth/login']);
        this.jwtService.remove();
        this.adminService.changeAuthStatus(false);
        return false;
      }
    return true;
  }
  
}
