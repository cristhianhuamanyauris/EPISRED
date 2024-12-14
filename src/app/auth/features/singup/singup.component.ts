import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from "@angular/forms"
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../datacces/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { unajmaEmailValidator } from '../../utils/validators';
export interface Formsingup {
  name: FormControl<string | null>;
  apel: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  phone: FormControl<string | null>;
  birthdate: FormControl<string | null>;
}


@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export default class SingupComponent {
  private _formBuilder = inject(FormBuilder); 
  private _authService = inject(AuthService);
  private _router = inject(Router);


  isRequired(field: keyof Formsingup) {
  return isRequired(field, this.form);
}


  hasEmailError(){
    return hasEmailError(this.form);
  }
  form = this._formBuilder.group<Formsingup>({
    name: this._formBuilder.control('', Validators.required),
    apel: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      unajmaEmailValidator(),
    ]),
    password: this._formBuilder.control('', Validators.required),
    phone: this._formBuilder.control('', Validators.required),
    birthdate: this._formBuilder.control('', Validators.required),
  });
  
  async submit() {
    if (this.form.invalid) return;
  
    try {
      const { email, password, name, apel, phone, birthdate } = this.form.value;
  
      // Construir objeto User con valores del formulario
      const user = {
        email: email ?? '',
        password: password ?? '',
        name: name ?? '',
        apel: apel ?? '',
        phone: phone ?? '',
        birthdate: birthdate ?? '',
      };
  
      await this._authService.singup(user);
      toast.success('Usuario creado correctamente');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('El usuario no se creó');
    }
  }
  
}