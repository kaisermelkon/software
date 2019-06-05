import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private grupoService: GrupoService, private usuarioService: UsuarioService) { 
    console.log(this.usuarioService.usuario);
  }

  ngOnInit() {
    
  }

}
