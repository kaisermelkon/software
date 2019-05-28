import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { User } from  'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: boolean;
  user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth, private FB: AngularFireModule) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  

  signUpUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['inicio']);
        this.token=true;
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  async signInUser(email: string, password: string) {
    try {
      await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
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
