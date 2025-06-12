import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        console.log('alo', this.authService.getUserId)
        sessionStorage.setItem("userId", value.email)
      })
    )
  }
}
