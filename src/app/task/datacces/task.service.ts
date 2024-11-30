import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id: string;
  tittle: string;
  descrip: string; 
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);
  getTasks = toSignal(collectionData(this._collection, {idField: 'id'}) as Observable<Task[]>, {initialValue: [], });
  create(task: TaskCreate){
    return addDoc(this._collection, task);
  }
}
