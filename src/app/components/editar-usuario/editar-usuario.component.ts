// 🔁 Importamos servicios y módulos
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  // Si viene un id => edición. Si no, creación
  @Input() id?: number;
  @Input() email: string = '';

  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<{ id: number; email: string }>();
  @Output() creado = new EventEmitter<{ id: number; email: string; created_at: string }>();

  form!: FormGroup;
  ocultando = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]]
    });

    // Activamos cerrar con Escape
    document.addEventListener('keydown', this.handleEscape);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.cerrarModal();
  };

  guardar(): void {
    if (this.form.invalid) return;

    const email = this.form.value.email!;

    if (this.id !== undefined) {
      // 🔄 Edición
      this.usuarioService.editarUsuario(this.id, email).subscribe({
        next: (res) => {
          if (res.success) {
            this.actualizado.emit({ id: this.id!, email });
            this.cerrarModal();
          } else {
            alert(res.message || 'No se pudo actualizar el usuario.');
          }
        },
        error: () => alert('Error al conectar con el servidor')
      });
    } else {
      // ➕ Creación
      this.usuarioService.crearUsuario(email).subscribe({
        next: (res) => {
          if (res.success && res.user) {
            this.creado.emit(res.user);  // 👈 Emitimos el objeto completo
            this.cerrarModal();
          } else {
            alert(res.message || 'No se pudo crear el usuario.');
          }
        },
        error: () => alert('Error al conectar con el servidor')
      });
    }
  }

  cerrarModal(): void {
    this.ocultando = true;
    setTimeout(() => this.cerrar.emit(), 200);
  }
}
