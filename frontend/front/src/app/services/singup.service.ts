import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(private httpClient: HttpClient) { }

  singup(name: string, password: string, email: string){
    return this.httpClient.post<any>("http://localhost:4000/singup", { name, password, email }).pipe(
      tap((value) => {
        console.log(value)
        return value
      })
    )
  }
}
