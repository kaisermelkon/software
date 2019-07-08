import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './shared/services/auth/auth.service';

/**
* AppComponent
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /**
  * variable title de tipo string
  * Nombre del proyecto
  */
  title = 'metroUber';

  /**
    * Constructor
    * @param {SuthService} authService El servicio de autentificacion
    */
  constructor(private authService: AuthService) { }

  /**
  * Inicializa la app con la informacion de firebase
  */
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAdK1fZcF1Li9wKorDRIESPvceS4RL8q9k",
      authDomain: "metrouber-2be7c.firebaseapp.com",
    });
  }
}
