import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/env';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId?: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks(): Observable<Task[]> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const params = new HttpParams().set('userId', this.authService.getUserId() as string);

    return this.http.get<Task[]>(this.baseUrl, { headers, params });
  }

  addTask(task: Partial<Task>): Observable<Task> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<Task>(`${this.baseUrl}`, task, { headers });
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task, { headers });
  }

  deleteTask(id: number): Observable<void> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}

