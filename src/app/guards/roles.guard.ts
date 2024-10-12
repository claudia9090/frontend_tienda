import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { NOMBRE_ROL } from "../shared/user";

export const roleAdminGuard = () => {
  const router = inject(Router);

  if (NOMBRE_ROL == 'ADMIN') {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

export const roleAdminEmpleadoGuard = () => {
    const router = inject(Router);
  
    if (NOMBRE_ROL == 'ADMIN' || NOMBRE_ROL == 'EMPLEADO' ) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  };

  export const roleClienteGuard = () => {
    const router = inject(Router);
  
    if (NOMBRE_ROL == 'CLIENTE') {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  };