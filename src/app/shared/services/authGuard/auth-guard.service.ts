import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

/**
   * AuthGuard Service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

   /**
 * Constructor
  * @param {AuthService} authService El servicio para verificar la autentificacion
  * @param {Router} router Para redirigir componentes
 */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Verifica que se pueda redirigir ya que el usuario esta autentificado
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
 */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}