import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primare-input/primare-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SingupService } from '../../services/singup.service';
import isTokenExpired from '../../auth/auth.isTokenExpired';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
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
    SingupService
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private singupService: SingupService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('auth-token');

    if (token && !isTokenExpired(token)) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    this.singupService.singup(this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => {
        this.toastService.success("Registration successful! Please log in to continue.");
        this.router.navigate(["/login"]);
      },
      error: () => this.toastService.error("Unexpected error! Please try again later.")
    });
  }

  navigate(){
    this.router.navigate(["login"])
  }
}
