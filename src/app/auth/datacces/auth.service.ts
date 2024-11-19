import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

export interface user {
  email: string;
  password: string;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);

  singup(user: user){
    return createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }

  constructor() { }
}
