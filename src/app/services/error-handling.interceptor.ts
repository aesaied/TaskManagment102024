import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(catchError((err) => {


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
