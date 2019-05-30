import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  constructor(private router: Router) { }

  signUpUser(email: string, password: string, username: string, phone: string){
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
}
