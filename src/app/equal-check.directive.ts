import { Directive, Input } from '@angular/core';
import { Validator } from '@angular/forms';
import { AbstractControl, ValidationErrors, NG_VALIDATORS, RequiredValidator } from '@angular/forms';
import { EqualityValid } from './EqualityValidator';

@Directive({
  selector: '[appEqualCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualCheckDirective, multi: true }]
})
export class EqualCheckDirective implements Validator {
  @Input() equalCheck;
  constructor() { }
  validate(control: AbstractControl): { [key: string]: any } {
    return EqualityValid(this.equalCheck)(control);
  }

}
