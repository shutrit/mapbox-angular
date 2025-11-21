import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export function phoneValidator(phonRe: RegExp): ValidatorFn { 
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim();
        if (!value) return null;
        const isValid = phonRe.test(control.value);
        return isValid ? null : { phoneNumberInvalid: { value: control.value } };
    }
}