import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];
  cargando = true;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (res) => {
        if (res.success) {
          this.usuarios = res.users;
        } else {
          this.error = 'No se pudieron cargar los usuarios';
        }
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al conectar con el servidor';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  eliminar(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (!confirmar) return;

    this.usuarioService.eliminarUsuario(id).subscribe({
      next: (res) => {
        alert(res.message);
        this.cargarUsuarios();
      },
      error: () => {
        alert('No se pudo eliminar el usuario.');
      }
    });
  }
}
