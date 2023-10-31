import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

export const canActivateAdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const toast = inject(ToastService)
  const { user$ } = userService;

  console.log("Ingresa al guard")

  return user$.pipe(
    take(1), 
    map((user) => {
      if (user && user.rol === 'Administrador') {
        return true; 
      } else {
        toast.showError("Debe ser administrador para acceder.", "Error");
        return false; 
      }
    })
  );
};
