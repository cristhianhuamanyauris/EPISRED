import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from "@angular/forms"
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../datacces/auth.service';
import { toast } from 'ngx-sonner';
export interface Formsingup {
    email: FormControl<string | null >;
    password: FormControl<string | null >;  
}

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export default class SingupComponent {
  private _formBuilder = inject(FormBuilder); 
  private _authService = inject(AuthService);
  isRequired(field: 'email' |  'password'){
    return isRequired(field, this.form);

  } 

  hasEmailError(){
    return hasEmailError(this.form);
  }
  form = this._formBuilder.group<Formsingup>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,

    ]),
    password: this._formBuilder.control('', Validators.required)
  });

  async submit(){
    if(this.form.invalid) return;  
   try {
      const {email, password} = this.form.value;
      if( !email || !password) return;
      console.log({email, password});
      await this._authService.singup({email, password}); 
      toast.success('usuario creado correctamente');
    } catch (error) {
      toast.error('Ocurrio un error');
    }
  }
}
