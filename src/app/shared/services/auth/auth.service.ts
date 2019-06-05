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

  signUpUser(usuario: Usuario, password: string){
    firebase.auth().createUserWithEmailAndPassword(usuario.correo, password).then(
      response => {
        this.router.navigate(['inicio']);
        this.token=true;
        this.usuarioService.createUsuario(usuario);
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  async signInUser(email: string, password: string) {
    try {
      await  this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.usuarioService.getUsuario(email);
      this.router.navigate(['./inicio']);
  } catch (e) {
      alert("Error!"  +  e.message);
  }
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

}
