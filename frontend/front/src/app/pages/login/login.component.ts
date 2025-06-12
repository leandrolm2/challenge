import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primare-input/primare-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import isTokenExpired from "../../auth/auth.isTokenExpired"

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('auth-token');

    if (token && !isTokenExpired(token)) {
      this.router.navigate(['/home']);
    }
  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.router.navigate(["home"]),
      error: (err) => {
        if (err?.error?.errors?.length) {
          err.error?.errors?.map((arr: any) => {
            this.toastService.error(arr.errors[0]);
          });
        } else {
          const errorMsg = err?.error?.error || "Unexpected error! Please try again later.";
          this.toastService.error(errorMsg);
        }
      }
    })
  }

  navigate(){
    this.router.navigate(["singup"])
  }
}
