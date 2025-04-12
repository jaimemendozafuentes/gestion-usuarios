import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private apiUrl = `${environment.apiUrl}/users/register.php`;

  constructor(private http: HttpClient) {}

  enviarDatos(formData: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
