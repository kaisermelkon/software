import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {Usuario} from '../../shared/models/Usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [AuthService]
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor(protected authService: AuthService) {
      this.usuario=new Usuario();
   }

  ngOnInit() {
  }



  onSubmit(form: NgForm){
    const password1=form.value.password;
    const password2=form.value.password2;
    this.usuario.correo=form.value.email;
    const correo=form.value.email;
    this.usuario.telefono=form.value.phone;
    this.usuario.nombre=form.value.username;
    this.usuario.cedula=form.value.cedula;
    this.usuario.edad=form.value.age;
    console.log("hello");
    if(password1 === password2){
      console.log("hello");
      this.authService.signUpUser(this.usuario, password1);
    }
  }

}
