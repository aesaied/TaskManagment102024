import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  //  write code check  if user is login  

  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }
  else {

    router.navigate(['/authentication/login'])
    return false;

  }
};
