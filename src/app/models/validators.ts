import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export function phoneValidator(phonRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) return null;
    const isValid = phonRe.test(control.value);
    return isValid ? null : { phoneNumberInvalid: { value: control.value } };
  };
}

export const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
