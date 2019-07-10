import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

 /**
   * Login Component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   /**
   * @ignore
 */
  navbarActive: string;
   /**
   * Para guardar al usuario que ya ingreso al sistema
 */
  token;

  /**
 * Constructor
  * @param {AuthService} authService El servicio para verificar al usuario
  * @param {UsuarioService} usuarioService El servicio para manejar al usuario
 */
  constructor(public authService: AuthService, public usuarioService: UsuarioService) { }

  /**
   * @ignore
 */
  ngOnInit() {
  }

  /**
   * Ingresa el usuario a su cuenta en la aplicacion
   * @param {NgForm} form El usuario a ingresar
 */
  async onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    await this.authService.signInUser(email, password);
    await this.sleep(2000);
    console.log(this.usuarioService.usuario+"cambio");
  }

  /**
   * Verifica que el usuario este autentificado
 */
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  /**
   * El usuario cierra sesion
 */
  logoutUser() {
    this.authService.logoutUser();
  }

  /**
   * @ignore
 */
  async sleep(ms) {
    ms=ms;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
