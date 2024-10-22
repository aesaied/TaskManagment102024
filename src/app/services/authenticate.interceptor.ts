import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authenticateInterceptor: HttpInterceptorFn = (req, next) => {


  // mutable 

  var newReq = req;
  var authService = inject(AuthService);
  if (authService.isLoggedIn) {
    var token = authService.getToken();
    newReq = req.clone({

      // Bearer <TokenValue>
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }


  return next(newReq);
};
