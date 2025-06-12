import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class SingupService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) { }

  singup(email: string, password: string){
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/register`, { password, email }).pipe(
      tap((value) => {
        return value
      })
    )
  }
}
