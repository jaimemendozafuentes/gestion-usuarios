import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service'; // ✅ Este es el bueno

@Component({
  selector: 'app-sign-in-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-formulario.component.html',
  styleUrl: './sign-in-formulario.component.css'
})
export class SignInFormularioComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService, // ✅ Usamos este
    private router: Router
  ) {}

  @Output() toggleForm = new EventEmitter<void>();

  cambiar() {
    this.toggleForm.emit();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      const datos = this.loginForm.value as { email: string; password: string };

      this.authService.login(datos.email, datos.password).subscribe({
        next: (res) => {

          if (res.success && res.token) {
            localStorage.setItem('token', res.token);
            alert('Login exitoso');
            this.router.navigate(['/dashboard']);
          } else {
            alert('Credenciales incorrectas o no se recibió token');
          }
        },
        error: (err) => {
          alert('Error al conectar con el servidor');
        }
      });
    }
  }

}
