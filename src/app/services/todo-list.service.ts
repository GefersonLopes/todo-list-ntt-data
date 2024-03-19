import { Injectable, inject } from '@angular/core';
import { ITask } from '../components/todo/todo.interface';
import todoListMock from '../components/todo/todo.mocked';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  todoList = todoListMock;
  toaster = inject(ToastrService);
  constructor() { }

  handleDeleteTask(taskId: number): void {
    this.todoList = this.todoList.map((todo) => {
      todo.tasks = todo.tasks.filter((task) => task.id !== taskId);
      return todo;
    });
    this.toaster.success(`Task has been deleted`);
  }

  handleAddTask(newTask: ITask, todoName: string): void {
    const todoId = this.todoList.findIndex((todo) => todo.title === todoName);
    this.todoList[todoId].tasks.push({...newTask, id: Math.floor(Math.random() * 1000) + 1});
    this.toaster.success(`New task has been added to ${this.todoList[todoId].title}`);
  }

  handleUpdateTask(updatedTask: ITask, taskId: number): void {
    this.todoList = this.todoList.map((todo) => {
      todo.tasks = todo.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...updatedTask };
        } else {
          return task;
        }
      });
      return todo;
    });
    this.toaster.success(`Task ${updatedTask.title} has been updated`);
  }
}
