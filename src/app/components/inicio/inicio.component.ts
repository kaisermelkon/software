import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Grupo } from './../../shared/models/Grupos';
import { PertenecesService } from 'src/app/shared/services/perteneces/perteneces.service';

/**
   * Inicio Component
 */
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  /**
   * Los grupos a los que pertenece el usuario
 */
  grupos: any = [];
  /**
   * @ignore
 */
  gruposId: any = [];
  /**
   * @ignore
 */
  tempGrupos: any;

  /**
 * Constructor
  * @param {GrupoService} grupoService El servicio para manejar grupos
  * @param {UsuarioService} usuarioService El servicio para manejar al usuario
  * @param {PertenecesService} pertenecesService El servicio para unir grupos con usuarios
 */
  constructor(private grupoService: GrupoService, private usuarioService: UsuarioService, private pertenecesService: PertenecesService) {
    console.log(this.usuarioService.usuario);
    
  }

  /**
   * @ignore
 */
  async ngOnInit() {
    await this.getGrupos();
  }

  /**
   * Obtiene los grupos a mostrar en pantalla
 */
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

  /**
   * Se obtiene los detalles del grupo que se selecciona
   * @param {number} id El id del grupo seleccionado
 */
  async detalles(id: number){
    console.log(id);
    this.grupoService.getGrupoDetalle(id.toString());
  }

  /**
   * Verifica que el usuario sea el administrador del grupo
 */
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


  /**
   * @ignore
 */
  async sleep(ms) {
    ms=ms;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
