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
  tempGrupos: any;

  constructor(private grupoService: GrupoService, private usuarioService: UsuarioService, private pertenecesService: PertenecesService) {
    console.log(this.usuarioService.usuario);
    
  }

  async ngOnInit() {
    await this.getGrupos();
  }

  async getGrupos() {
    
    await this.pertenecesService.getPerGrupos(this.usuarioService.usuario.id).subscribe(res => {
      this.gruposId = res;
      
    }, err => console.log(err));
    await this.sleep(2000);
    console.log(this.gruposId+" todos los grupos Id")
    for(let grupo of this.gruposId){
      console.log(grupo+" deveria ser el id");
      this.grupoService.getGrupo(grupo).subscribe(res => {
        this.tempGrupos = res;
        
      }, err => console.log(err));;
      console.log(this.tempGrupos+" el grupo")
      await this.sleep(1000);
      this.grupos.push(this.tempGrupos);
    }
    console.log(this.grupos);
  }

  async detalles(id: number){
    console.log(id);
    this.grupoService.getGrupoDetalle(id.toString());
  }

  async grupoCodigo(grupo: Grupo){
    console.log(this.usuarioService.usuario.id+"+"+grupo.administradorId);
    if(this.usuarioService.usuario.id===grupo.administradorId){
      console.log("true")
      return true;
    }
    else{
      console.log("false")
      return false;
    }
  }



  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
