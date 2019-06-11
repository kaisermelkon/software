import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Grupo } from './../../shared/models/Grupos';
import { PertenecesService } from 'src/app/shared/services/perteneces/perteneces.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  grupos: any = [];
  gruposId: any = [];

  constructor(private grupoService: GrupoService, private usuarioService: UsuarioService, private pertenecesService: PertenecesService) {
    console.log(this.usuarioService.usuario);
    
  }

  async getGrupos() {
    
    await this.pertenecesService.getPerGrupos(this.usuarioService.usuario.id).subscribe(res => {
      this.gruposId = res;
      
    }, err => console.log(err));
    await this.sleep(2000);
    console.log(this.gruposId+" todos los grupos Id")
    for(let grupo of this.gruposId){
      console.log(grupo+" deveria ser el id")
      const temp=this.grupoService.getGrupo(grupo);
      console.log(temp+" el grupo")
      await this.sleep(1000);
      this.grupos.push(temp);
    }
    console.log(this.grupos);
  }

  async ngOnInit() {
    await this.getGrupos();
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
