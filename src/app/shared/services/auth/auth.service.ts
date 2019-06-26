import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { User } from  'firebase';
import { UsuarioService } from './../usuario/usuario.service';
import {Usuario} from '../../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: boolean;
  user: User;
  usuario: Usuario;

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

  async temp (){
    this.router.navigate(['./inicio']);
  }


  isAuthenticated(){
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async logoutUser() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['./login']);
  }

  async sleep(ms) {
    ms=ms/2;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
