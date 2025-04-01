import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId');

  if (userId) {
    return true; // ✅ Acceso permitido
  }

  // 🚫 Si no hay usuario, redirige al login
  window.alert('Debes iniciar sesión para acceder');
  window.location.href = '/';
  return false;
};

