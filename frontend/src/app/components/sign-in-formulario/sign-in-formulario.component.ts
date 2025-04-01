import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SignInFormularioService } from '../../services/formulario/sign-in-formulario.service';

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
    private signInService: SignInFormularioService,
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

      this.signInService.iniciarSesion(datos).subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('userId', res.userId);
            alert('Login exitoso');
            this.router.navigate(['/dashboard']);
          } else {
            alert(res.message || 'Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Error al conectar con el servidor');
        }
      });
    }
  }
}
