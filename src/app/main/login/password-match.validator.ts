import { ValidatorFn, AbstractControl } from '@angular/forms';

export class PasswordMatchValidator {
  static passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.get('password');
    const password_repeat = control.get('password_repeat');

    if (password && password_repeat && password.value !== password_repeat.value) {

      return { 'passwordMismatch': true };
    }

    return null;
  };
}
