import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validation',
  standalone: true
})
export class ValidationPipe implements PipeTransform {

  transform(value: ValidationErrors | null, ...args: unknown[]): string | null {

    if (value === null) {
      return null;
    }

    else {
      if (value?.["required"]) {
        return "is required!";
      }
      else if (value?.["maxlength"]) {
        return "is too long!";
      }
      else if (value?.["minlength"]) {
        return "is too short!";
      }
      else if (value?.["email"]) {
        return "is not valid format!";
      }
      else if (value?.["compare"]) {
        return "is not matched!";
      }
    }

    return "Unkown error!";

  }

}
