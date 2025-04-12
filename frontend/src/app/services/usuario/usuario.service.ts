import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

interface Usuario {
  id: number;
  email: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/list.php`;

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<{ success: boolean, users: Usuario[] }> {
    return this.http.get<{ success: boolean, users: Usuario[] }>(this.apiUrl);
  }

  eliminarUsuario(id: number) {
    const url = `${environment.apiUrl}/delete.php`;
    return this.http.post<{ success: boolean; message: string }>(url, { id });
  }

  editarUsuario(id: number, email: string) {
    const url = `${environment.apiUrl}/update.php`;
    return this.http.post<{ success: boolean; message: string }>(url, { id, email });
  }

  crearUsuario(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register.php`, {
      email,
      password: 'Temporal123!'
    });
  }



}
