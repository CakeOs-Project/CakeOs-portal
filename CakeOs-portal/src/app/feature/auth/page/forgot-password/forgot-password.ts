import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  private readonly router = inject(Router);

  cambiarContrasena(): void {
    this.router.navigate(['/auth']);
  }

  volverAlInicio(): void {
    this.router.navigate(['/auth']);
  }
}
