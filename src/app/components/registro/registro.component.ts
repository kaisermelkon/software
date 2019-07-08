import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {Usuario} from '../../shared/models/Usuario';

/**
 * Registro Component
 */

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

   /**
 * Es el usuario que se va a crear en el componente
 */
 usuario: Usuario;


   /**
    * Crea un nuevo usuario para ser usado en la aplicacion
 * @param {AuthService} authService El servicio de registro
 */
  constructor(protected authService: AuthService) {
      this.usuario=new Usuario();
   }

  /**
 * NgOnInit
 */
  ngOnInit() {
  }


  /**
   *  Se registra un nuevo usuario en la aplicacion
 * @param {NgForm} form  La data del usuario a registrar
 * @returns El usuario registrado
 */
  async onSubmit(form: NgForm){
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
      await this.authService.signUpUser(this.usuario, password1);
    }
  }

}
