import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Grupo } from './../../shared/models/Grupos';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  grupos: any = [];

  constructor(private grupoService: GrupoService, private usuarioService: UsuarioService) {
    console.log(this.usuarioService.usuario);
    
  }

  async getGrupos() {
    
    await this.grupoService.getGruposAdministrador(this.usuarioService.usuario.id).subscribe(res => {
      this.grupos = res;
      
    }, err => console.log(err));
    await this.sleep(2000);
    console.log(this.grupos);
  }

  async ngOnInit() {
    await this.getGrupos();
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
