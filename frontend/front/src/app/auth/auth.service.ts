import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  email?: string;
  exp?: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  getUserId(): string | null {
    const token = this.getToken();

    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      return decoded.id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
  }
}
