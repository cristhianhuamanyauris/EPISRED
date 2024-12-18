import { FormGroup } from "@angular/forms";
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
export const isRequired = (field: string, form: FormGroup): boolean => {
  const control = form.get(field);
  // Aseguramos que siempre devuelva un booleano
  return control ? control.touched && control.hasError('required') : false;
};

export const hasEmailError = (form: FormGroup) => {
    const control = form.get('email');
    return control && control.touched && control.hasError('unajmaEmail');
}
export function unajmaEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // Si no hay valor, no hay error
  
      // Expresión regular para el correo institucional de la UNAJMA
      const emailPattern = /^[a-zA-Z0-9._%+-]+@unajma\.edu\.pe$/;
  
      return emailPattern.test(control.value) ? null : { unajmaEmail: true };
    };
  }
  