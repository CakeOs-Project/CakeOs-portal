import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthInput } from "../../component/auth-input/auth-input";
import { AuthLogo } from "../../component/auth-logo/auth-logo";
import { AuthLayout } from "../../component/auth-layout/auth-layout";
import { AuthButton } from "../../component/auth-button/auth-button";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [AuthInput, AuthLogo, AuthLayout, AuthButton, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  
  onSubmit(): void {
    this.errorMessage.set(null);
    this.loading.set(true);

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/factura');
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Correo o contraseña incorrectos.');
      },
    });
  }
}
