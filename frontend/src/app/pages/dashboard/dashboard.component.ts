import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cerrarSesion() {
    localStorage.removeItem('userId');
    window.location.href = '/'; // o this.router.navigate(['/']);
  }


}
