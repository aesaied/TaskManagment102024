import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function compareValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        let otherControl = control.parent?.get(controlName);

        if (otherControl) {
            if (control.value !== otherControl.value) {
                return { compare: { value: `The value not equal the value of ${controlName} ` } };
            }
        }
        return null;
    }
}