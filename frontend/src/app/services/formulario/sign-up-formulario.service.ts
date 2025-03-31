import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  // Ruta correcta a tu archivo PHP (ajusta si la ruta varía)
  private apiUrl = 'http://localhost:3000/backend/users/register.php';

  constructor(private http: HttpClient) {}

  enviarDatos(formData: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
