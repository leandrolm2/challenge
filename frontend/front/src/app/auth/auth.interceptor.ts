import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import isTokenExpired from './auth.isTokenExpired';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('auth-token');

  if (token && isTokenExpired(token)) {
    sessionStorage.removeItem('auth-token');
    router.navigate(['/login']);
    return next(req);
  }

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq);
};

