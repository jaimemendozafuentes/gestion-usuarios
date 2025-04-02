import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignInFormularioService {
  constructor(private authService: AuthService) {}

  iniciarSesion(datos: { email: string; password: string }): Observable<any> {
    return this.authService.login(datos.email, datos.password); // ✅ usa el AuthService
  }
}
