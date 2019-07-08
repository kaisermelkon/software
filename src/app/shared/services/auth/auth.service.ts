import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { User } from  'firebase';
import { UsuarioService } from './../usuario/usuario.service';
import {Usuario} from '../../models/Usuario';

/**
   * Servicio de autentificacion
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   *El token del usuario ingresado
 */
  token: boolean;
  /**
   * El usuario ingresado
 */
  user: User;
  /**
   * @ignore
 */
  usuario: Usuario;

  /**
   * Se guarda el usuario ingresado
   * @param {Router} router El router para redirigir en la aplicacion
   * @param {AngularFireAuth} afAuth Para realizar la autentificacion de firebase
   * @param {AngularFireModule} FB Para realizar la autentificacion de firebase
   * @param {UsuarioService} usuarioService Para crear un nuevo usuario
 */
  constructor(private router: Router, private afAuth: AngularFireAuth, private FB: AngularFireModule, private usuarioService: UsuarioService) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

   /**
   * Registra un nuevo usuario
   * @param {Usuario} usuario El usuario a registrar
   * @param {string} password La contrasena del usuario a registrar
 */
  async signUpUser(usuario: Usuario, password: string){
    await firebase.auth().createUserWithEmailAndPassword(usuario.correo, password).then(
      response => {
        this.token=true;
        this.usuarioService.createUsuario(usuario);
      }
    )
    .catch(
      error => console.log(error)
    );
    
    this.router.navigate(['./login']);
  }

  /**
   * Ingresa un usuario preexistente
   * @param {string} email El email dle usuario a ingresar
   * @param {string} password La contrasena del usuario a ingresar
 */
  async signInUser(email: string, password: string) {
    try {
      await  this.afAuth.auth.signInWithEmailAndPassword(email, password);
      await this.usuarioService.getUsuario(email);
      await this.sleep(2000);
      this.temp();
  } catch (e) {
      alert("Error!"  +  e.message);
  }
  }

  /**
   * Redirige al inicio
 */
  async temp (){
    this.router.navigate(['./inicio']);
  }

  /**
   * Verifica que se este autenticado
 */
  isAuthenticated(){
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  /**
   * Cierra sesion del usuario
 */
  async logoutUser() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['./login']);
  }

  /**
   * @ignore
 */
  async sleep(ms) {
    ms=ms/2;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
