import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodoType } from '../components/todo/todo.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  type = new BehaviorSubject<string>('');
  category = new BehaviorSubject<string>('');
  taskId = new BehaviorSubject<number>(0);

  isOpen$ = this._isOpen.asObservable();
  type$ = this.type.asObservable();
  category$ = this.category.asObservable();
  taskId$ = this.taskId.asObservable();

  constructor() { }

  openModal({type, category, taskId}: ITodoType) {
    this._isOpen.next(true);
    this.type.next(type);
    this.category.next(category);
    this.taskId.next(taskId);
  }

  closeModal() {
    this._isOpen.next(false);
  }
}
