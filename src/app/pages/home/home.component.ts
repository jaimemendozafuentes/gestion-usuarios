import { Component } from '@angular/core';
import { SignUpFormularioComponent } from '../../components/sign-up-formulario/sign-up-formulario.component';
import { SignInFormularioComponent } from '../../components/sign-in-formulario/sign-in-formulario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SignUpFormularioComponent, CommonModule, SignInFormularioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showLogin = false;

  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}
