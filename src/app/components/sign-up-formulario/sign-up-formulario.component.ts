import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../../services/formulario/sign-up-formulario.service';

@Component({
  selector: 'app-sign-up-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-formulario.component.html',
  styleUrl: './sign-up-formulario.component.css'
})
export class SignUpFormularioComponent {
  constructor(private http: HttpClient, private formularioService: FormularioService) {}

  @Output() toggleForm = new EventEmitter<void>();

  cambiar() {
    this.toggleForm.emit();
  }

  registroExitoso = false;
  errorRegistro = '';

  profileForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,}$/)
      ]),
      passwordRepeat: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl(false, [Validators.requiredTrue])
    },
    { validators: this.passwordsMatchValidator() }
  );

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get repeatPassword() {
    return this.profileForm.get('passwordRepeat');
  }

  get passwordsDontMatch(): boolean {
    return this.profileForm.hasError('passwordsDontMatch');
  }

  passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password');
      const repeatPassword = group.get('passwordRepeat');

      if (password && repeatPassword && password.value !== repeatPassword.value) {
        repeatPassword.setErrors({ passwordsDontMatch: true });
        return { passwordsDontMatch: true };
      } else {
        repeatPassword?.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = {
        email: this.profileForm.get('email')?.value ?? '',
        password: this.profileForm.get('password')?.value ?? ''
      };

      this.formularioService.enviarDatos(formData).subscribe({
        next: (response) => {
          this.registroExitoso = true;
          this.errorRegistro = '';
          this.profileForm.reset();
        },
        error: (err) => {
          this.errorRegistro = err.error?.error || 'Error inesperado';
          this.registroExitoso = false;
        }
      });
    }
  }
}
