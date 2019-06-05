import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  navbarActive: string;
  token;

  constructor(protected authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email, password);
    await this.sleep(2000);
    console.log(this.usuarioService.usuario);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logoutUser() {
    this.authService.logoutUser();
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
