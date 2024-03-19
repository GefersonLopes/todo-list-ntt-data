import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalService } from '../../services/modal.service';

import { Subscription } from 'rxjs';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  isOpen = false;
  type = '';
  category = '';
  taskId = 0;
  private isOpenSubscription: Subscription | undefined;

  constructor(
    private modalService: ModalService,
    private todoListService: TodoListService
  ) {}

  ngOnInit() {
    this.isOpenSubscription = this.modalService.isOpen$.subscribe((value) => {
      this.isOpen = value;
    });
    this.modalService.type$.subscribe((value) => {
      this.type = value;
    });
    this.modalService.category$.subscribe((value) => {
      this.category = value;
    });
    this.modalService.taskId$.subscribe((value) => {
      this.taskId = value;
    });
  }

  ngOnDestroy() {
    if (this.isOpenSubscription) {
      this.isOpenSubscription.unsubscribe();
    }
  }

  openModal() {
    this.modalService.openModal({
      type: this.type,
      category: this.category,
      taskId: this.taskId
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  addEvent() {
    if (this.type === 'add') {
      this.todoListService.handleAddTask({
        title: this.title,
        date: this.date,
        status: 'progress',
        id: Math.floor(Math.random() * 1000) + 1,
      }, this.category);
      this.closeModal();
    } else if (this.type === 'edit') {
      this.todoListService.handleUpdateTask({
        title: this.title,
        date: this.date,
        status: 'progress',
        id: this.taskId,
      }, this.taskId);
      this.closeModal();
    } else {
      this.todoListService.handleDeleteTask(this.taskId);
      this.closeModal();
    }
  }

  title = '';
  date = '';
}
