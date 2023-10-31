import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { SwalService } from '../services/swal.service';

export const canActivateAdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const swal = inject(SwalService)
  const { esAdmin } = userService;

  if(esAdmin)
  {
    return true
  }

  swal.Error("ERROR","¡No puede ingresar sin ser Administrador!")
  router.navigateByUrl('/');
  return false;
};
