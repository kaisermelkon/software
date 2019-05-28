import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'metroUber';

  constructor(private authService: AuthService) { }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAdK1fZcF1Li9wKorDRIESPvceS4RL8q9k",
      authDomain: "metrouber-2be7c.firebaseapp.com",
    });
  }
}
