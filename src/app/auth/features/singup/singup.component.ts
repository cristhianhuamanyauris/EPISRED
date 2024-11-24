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
    email: FormControl<string | null >;
    password: FormControl<string | null >;  
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
  isRequired(field: 'email' |  'password'){
    return isRequired(field, this.form);

  } 

  hasEmailError(){
    return hasEmailError(this.form);
  }
  form = this._formBuilder.group<Formsingup>({
    email: this._formBuilder.control('', [
      Validators.required,
      //Validators.email,
      unajmaEmailValidator(), // Aquí agregamos el validador personalizado

    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit(){
    if(this.form.invalid) return;  
    try {
      const {email, password} = this.form.value;
      if( !email || !password) return;
      //console.log(this.form.getRawValue());
      await this._authService.singup({email, password});
      toast.success('usuario creado correctamente')
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('El usuario no se creo')
    }
  
      //const {email, password} = this.form.value;
      //if( !email || !password) return;
      //console.log(this.form.getRawValue());
      //this._authService.singup({email, password}); 
      //toast.success('usuario creado correctamente');
    
  }
}
