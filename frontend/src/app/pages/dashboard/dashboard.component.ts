import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cerrarSesion() {
    localStorage.removeItem('userId');
    window.location.href = '/'; // o this.router.navigate(['/']);
  }


}
