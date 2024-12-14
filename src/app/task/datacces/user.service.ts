import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthStateService } from '../../comp/dataccces/auth-state.service'; // Para obtener el estado de autenticación

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService);

  // Obtener los detalles del usuario desde Firestore
  getUserDetails() {
    const uid = this._authState.currentUser?.uid;
    if (!uid) {
      return Promise.resolve(null);
    }

    const userRef = doc(this._firestore, `users/${uid}`);
    return getDoc(userRef);
  }
}
