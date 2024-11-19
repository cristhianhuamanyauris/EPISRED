import { FormGroup } from "@angular/forms";

export const isRequired = (filed: 'email' | 'password', form: FormGroup) => {
    const control = form.get(filed);

    return control && control.touched && control.hasError('required');
};

export const hasEmailError = (form: FormGroup) => {
    const control = form.get('email');
    return control && control.touched && control.hasError('email');
}