import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, EditarUsuarioComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];
  cargando = true;
  error = '';

  // Props para el modal
  mostrarModal = false;
  usuarioSeleccionado: { id: number, email: string } | null = null;

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

  // 🔧 Métodos para edición
  editar(usuario: any): void {
    this.usuarioSeleccionado = { id: usuario.id, email: usuario.email };
    this.mostrarModal = true;
  }

  actualizarUsuario(data: { id: number, email: string }): void {
    this.usuarioService.editarUsuario(data.id, data.email).subscribe({
      next: (res) => {
        alert(res.message);
        this.mostrarModal = false;
        this.cargarUsuarios();
      },
      error: () => {
        alert('Error al actualizar el usuario.');
      }
    });
  }

  nuevoVisible = false;

abrirNuevo() {
  this.nuevoVisible = true;
}

crearUsuario(usuario: { id: number, email: string, created_at: string }) {
  this.usuarios.unshift(usuario); // Añade al principio de la tabla
  this.nuevoVisible = false;             // ✅ Cierra el modal
}


  cerrarModal(): void {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
  }
}
