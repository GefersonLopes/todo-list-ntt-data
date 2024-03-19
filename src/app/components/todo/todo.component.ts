import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';

import todoListMock from './todo.mocked';
import { ITask, ITodo } from './todo.interface';
import { ModalService } from '../../services/modal.service';

export interface ITodoType {
  type: string;
  category: string;
  taskId: number;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  constructor(private modalService: ModalService) {}

  toaster = inject(ToastrService);
  todoList = todoListMock;

  handleOpenModal({type, category, taskId}: ITodoType): void {
    this.modalService.openModal({type, category, taskId});
  }

  isDateOverdue(date: string): boolean {
    const today = dayjs();
    const taskDate = dayjs(date);
    return today.isAfter(taskDate, 'day');
  }

  handleCheckTask(task: ITask): void {
    task.status = task.status === 'done' ? 'progress' : 'done';
    this.toaster.success(`Task ${task.title} is ${task.status === 'done' ? 'done' : 'in progress'}`);
  }
}
