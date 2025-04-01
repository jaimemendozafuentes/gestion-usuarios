import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInFormularioService {
  private apiUrl = `${environment.apiUrl}/users/login.php`;

  constructor(private http: HttpClient) {}

  iniciarSesion(datos: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
