import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);

  singup(user: User){
    return createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }

  singin(user: User){
    return signInWithEmailAndPassword(this._auth, user.email, user.password)
  }
}
