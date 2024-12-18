import { inject, Injectable, Query, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { updateCurrentUser } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, query, updateDoc, where, deleteDoc } from '@angular/fire/firestore';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { AuthStateService } from '../../comp/dataccces/auth-state.service';
export interface Task {
  id: string;
  tittle: string;
  descrip: string; 
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';
@Injectable(/*{ 
  providedIn: 'root'
}*/)
export class TaskService {
  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService)
  private _collection = collection(this._firestore, PATH);
  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  )
  
  loading = signal<boolean>(true); 
  getTasks = toSignal((collectionData(this._query, {idField: 'id'}) as Observable<Task[]>).pipe(
    tap(() => {
      this.loading.set(false)
    }),
    catchError(error => {
      this.loading.set(false);
      return throwError(() => error);
    })
  ), {initialValue: [], });

  constructor(){
    console.log(this._authState.currentUser);
  }

  getTask(id: string){
    const docRef = doc(this._collection, id)
    return getDoc(docRef);
  }
  create(task: TaskCreate){
    return addDoc(this._collection, {...task, userId: this._authState.currentUser?.uid});
  }

  update(task: TaskCreate, id: string){
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, {...task, userId: this._authState.currentUser?.uid});

  }
  delete(id: string): Promise<void> {
    const docRef = doc(this._collection, id); // Referencia al documento
    return deleteDoc(docRef); // Llamar a deleteDoc para eliminar el documento
  }
}
