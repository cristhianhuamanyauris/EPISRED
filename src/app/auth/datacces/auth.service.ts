import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc  } from '@angular/fire/firestore';
export interface User {
  email: string;
  password: string;
  name?: string;
  apel?: string;
  phone?: string;
  birthdate?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

  async singup(user: User) {
    // Crear usuario en Firebase Authentication
    const credential = await createUserWithEmailAndPassword(this._auth, user.email, user.password);

    // Guardar datos adicionales en Firestore
    const uid = credential.user.uid;
    const userDocRef = doc(this._firestore, `users/${uid}`);
    const userData = {
      name: user.name || '',
      apel: user.apel || '',
      phone: user.phone || '',
      birthdate: user.birthdate || '',
    };

    await setDoc(userDocRef, userData);

    return credential;
  }
  singin(user: User){
    return signInWithEmailAndPassword(this._auth, user.email, user.password)
  }
}