import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AuthService } from './auth.service';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {


  var router = inject(Router);
  var toastr = inject(ToastrService);
  var authService = inject(AuthService);

  return next(req).pipe(catchError((err) => {

    if (err.status == 401) {

      if (authService.isLoggedIn && !authService.isTokenExpired) {

        toastr.warning('Access denied!');

      }
      else {
        toastr.warning('Your session expired, please login again!');
        router.navigate(['/authentication/login'])
      }


      throw ['Session expired!'];

    }
    console.log(err);
    var errorDetails = "";

    for (var e in err.error) {
      if (errorDetails != "") {
        errorDetails += "\n";
      }
      errorDetails += err.error[e][0];
    }

    throw errorDetails;
  }));
};
