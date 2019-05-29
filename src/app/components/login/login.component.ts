import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  navbarActive: string;
  token;

  constructor(protected authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email, password);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logoutUser() {
    this.authService.logoutUser();
  }

}
