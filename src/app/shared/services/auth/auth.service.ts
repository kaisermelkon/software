import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  selectedUsuario: Usuario; 

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  usuarios: Usuario[];

  token: string;

  constructor(private router: Router, private http: HttpClient) {
    this.selectedUsuario = new Usuario();
   }

  signUpUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['inicio']);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => this.token=token
        )
      }
    

    )
    .catch(
      error => console.log(error)
    );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['inicio']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.token = token
          )
        }
      ).catch(
        error => console.log(error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated(){
    return this.token!=null
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  postUsuarios(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario);
  }

  putUsuario(usuario: Usuario){
    return this.http.put(this.URL_API + `/${usuario.id}`, usuario);
  }

  deleteUsuario(id: string){
    return this.http.delete(this.URL_API + `/${id}`);
  }
}
