import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../datacces/auth.service';
import { hasEmailError, isRequired } from '../../utils/validators';
import { Router, RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { FormGroup } from '@angular/forms';

export interface Formsingin{
    email: FormControl<string | null >;
    password: FormControl<string | null >; 
}
@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css'
})
export default class SinginComponent {
  private _formBuilder = inject(FormBuilder); 
  private _authService = inject(AuthService);
  private _router = inject(Router);
  isRequired(field: 'email' |  'password'){
    return isRequired(field, this.form);

  } 

  hasEmailError(){
    return hasEmailError(this.form);
  }
  form = this._formBuilder.group<Formsingin>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,

    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit(){
    if(this.form.invalid) return;  
    try {
      const {email, password} = this.form.value;
      if( !email || !password) return;
      //console.log(this.form.getRawValue());
      await this._authService.singin({email, password});
      toast.success('Hola de nuevo')
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
