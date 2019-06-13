import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    console.log(this.usuarioService.usuario);
  }

}
