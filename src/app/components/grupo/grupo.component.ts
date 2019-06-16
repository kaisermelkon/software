import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { PertenecesService } from 'src/app/shared/services/perteneces/perteneces.service';
import { Usuario } from 'src/app/shared/models/Usuario';
import { Grupo } from 'src/app/shared/models/Grupos';
import { Perteneces } from 'src/app/shared/models/Perteneces';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  administrador: boolean = false;
  usuarios: any=[];
  usuariosId: any=[];
  tempUsuarios: any;
  pertenecesId: any;

  constructor(private grupoService: GrupoService, private usuarioService: UsuarioService, private pertenecesService: PertenecesService) { }

  async ngOnInit() {
    await this.sleep(1000);
    if(this.grupoService.grupo.administradorId===this.usuarioService.usuario.id){
      this.administrador=true;
    }
    await this.pertenecesService.getPerUsuarios(this.grupoService.grupo.id).subscribe(res => {
      this.usuariosId = res;
      
    }, err => console.log(err));
    await this.sleep(1000);
    console.log(this.usuariosId+" todos los usuarios Id")
    for(let usuario of this.usuariosId){
      console.log(usuario+" deveria ser el id");
      this.usuarioService.getUsuarioDetalle(usuario).subscribe(res => {
        this.tempUsuarios = res;
        
      }, err => console.log(err));;
      console.log(this.tempUsuarios+" el usuario")
      await this.sleep(1000);
      this.usuarios.push(this.tempUsuarios);
    }
  }

  conCarro(usuario: Usuario){
    if(usuario.carroId===null){
      return true;
    }
    else{
      return false;
    }
  }

  eliminarEnabled(usuario: Usuario){
    if(this.administrador){
      if(usuario.id===this.grupoService.grupo.administradorId){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      if(usuario.id===this.usuarioService.usuario.id){
        return true;
      }
      else{
        return false;
      }
    }
  }

  async eliminar(usuario: Usuario){
    this.pertenecesService.getPerUsuariosGrupos(this.grupoService.grupo.id.toString(), usuario.id.toString()).subscribe(res => {
      this.pertenecesId = res;
    }, err => console.log(err));
    await this.sleep(1000);
    console.log(this.pertenecesId+" este es el perteneces id")
    this.pertenecesService.deletePerteneces(this.pertenecesId);
    await this.sleep(1000);
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
