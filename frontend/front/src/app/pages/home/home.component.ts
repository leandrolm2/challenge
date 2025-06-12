import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  editing: boolean;
  createdAt: Date;
  userId?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, FormsModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  filtered: Task[] = [];
  newTitle = '';
  newDescription = '';
  isLoading = false;
  errorMessage = '';
  taskFilter: 'all' | 'completed' | 'incomplete' = 'all';
  currentPage = 1;
  pageSize = 3;
  totalCount = 0;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;

    let completed: boolean | undefined;
    if (this.taskFilter === 'completed') completed = true;
    if (this.taskFilter === 'incomplete') completed = false;

    this.taskService.getTasks({
      page: this.currentPage,
      pageSize: this.pageSize,
      completed
    }).subscribe({
      next: (response) => {
        this.tasks = (response.data || []).map((task: any) => ({ ...task, editing: false }));
        this.totalCount = response.totalCount ?? 0;
      },
      error: () => this.toastr.error('Failed to load tasks.'),
      complete: () => (this.isLoading = false),
    });
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadTasks();
  }

  addTask() {
    if (!this.newTitle.trim()) {
      this.toastr.error('Title is required.');
      return;
    }

    const userId = this.authService.getUserId();

    const newTask: Partial<Task> = {
      title: this.newTitle,
      description: this.newDescription,
      completed: false,
      createdAt: new Date(),
      userId: userId ?? undefined
    };

    this.isLoading = true;
    this.taskService.addTask(newTask).subscribe({
      next: (createdTask) => {
        this.tasks.push({ ...createdTask, editing: false });
        this.toastr.success('Task added successfully.');
        this.newTitle = '';
        this.newDescription = '';
        this.loadTasks();
      },
      error: () => this.toastr.error('Failed to add task.'),
      complete: () => (this.isLoading = false),
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
        this.toastr.success('Task deleted.');
      },
      error: () => this.toastr.error('Failed to delete task.'),
    });
  }

  updateTask(task: Task) {
    if (!task.title.trim()) {
      this.toastr.error('Title cannot be empty.');
      return;
    }

    const { title, description, completed } = task;

    this.taskService.updateTask(task.id, { title, description, completed }).subscribe({
      next: () => {
        task.editing = false;
        this.toastr.success('Task updated.');
      },
      error: () => this.toastr.error('Failed to update task.'),
    });
  }

  editTask(task: Task) {
    task.editing = true;
  }

  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.updateTask(task);
  }

  onToggleAttempt(task: Task) {
    if (this.canToggle(task)) {
      this.toggleCompleted(task);
    } else {
      this.toastr.warning('You can only mark a finalized task as completed.');
    }
  }

  canToggle(task: Task): boolean {
    return !task.editing;
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString();
  }

  filteredTasks() {
    switch (this.taskFilter) {
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'incomplete':
        return this.tasks.filter(task => !task.completed);
      default:
        return this.tasks;
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }
}
