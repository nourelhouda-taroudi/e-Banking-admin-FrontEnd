import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private returnUrl?: string;

  constructor(private router: Router, private jwtService: JwtService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedPaths = ['auth/login'];
    const urlFoundInExcluded = excludedPaths.filter(
      (path) => request.url.indexOf(path) !== -1
    );

    if (this.jwtService.getToken() && urlFoundInExcluded.length === 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtService.getToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
