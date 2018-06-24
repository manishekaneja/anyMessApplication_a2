import { ValidatorFn, AbstractControl } from '@angular/forms'

export function EqualityValid(name: String): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return (name != control.value) ? { 'notEqual': { value: control.value } } : null;
    }
}
