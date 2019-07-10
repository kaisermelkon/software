import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { PertenecesService } from 'src/app/shared/services/perteneces/perteneces.service';
import { CarroService } from 'src/app/shared/services/carro/carro.service';
import { DireccionService } from 'src/app/shared/services/direccion/direccion.service';
import { InvitacionService } from 'src/app/shared/services/invitacion/invitacion.service';
import { Usuario } from 'src/app/shared/models/Usuario';
import { Grupo } from 'src/app/shared/models/Grupos';
import { Perteneces } from 'src/app/shared/models/Perteneces';
import { Direccion } from 'src/app/shared/models/Direccion';
import { Invitacion } from 'src/app/shared/models/Invitaciones';

/**
   * Grupo Component
 */
@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  /**
   * El usuario es el administrador del grupo
 */
  administrador: boolean = false;
  /**
   * Los usuarios del grupo
 */
  usuarios: any = [];
  /**
   * @ignore
 */
  usuariosId: any = [];
  /**
   * @ignore
 */
  tempUsuarios: any;
  /**
   * @ignore
 */
  pertenecesId: any;
  /**
   * @ignore
 */
  usuarioModal: any;
  /**
   * La invitacion para pedir transporte
 */
  invitacion: any;

  /**
 * Constructor
  * @param {CarroService} carroService El servicio para obtener los datos de los vehiculos
  * @param {GrupoService} grupoService El servicio para manejar grupos
  * @param {DireccionService} direccionService El servicio para obtener la direccion
  * @param {UsuarioService} usuarioService El servicio para manejar al usuario
  * @param {PertenecesService} pertenecesService El servicio para unir grupos con usuarios
  * @param {InvitacionService} invitacionService El servicio para obtener las invitaciones
 */
  constructor(public grupoService: GrupoService, public usuarioService: UsuarioService, public pertenecesService: PertenecesService, public carroService: CarroService, public direccionService: DireccionService, public invitacionService: InvitacionService) { }

  /**
   * Trae todos los detalles del grupo
 */
  async ngOnInit() {
    this.invitacion = new Invitacion();
    this.usuarioModal = new Usuario();
    await this.sleep(1000);
    if (this.grupoService.grupo.administradorId === this.usuarioService.usuario.id) {
      this.administrador = true;
    }
    await this.pertenecesService.getPerUsuarios(this.grupoService.grupo.id).subscribe(res => {
      this.usuariosId = res;

    }, err => console.log(err));
    await this.sleep(1000);
    console.log(this.usuariosId + " todos los usuarios Id")
    for (let usuario of this.usuariosId) {
      console.log(usuario + " deveria ser el id");
      this.usuarioService.getUsuarioDetalle(usuario).subscribe(res => {
        this.tempUsuarios = res;

      }, err => console.log(err));;
      console.log(this.tempUsuarios + " el usuario")
      await this.sleep(1000);
      this.usuarios.push(this.tempUsuarios);
    }
  }

/**
   * Verifica que los usuarios posean vehiculo
 */
  conCarro(usuario: Usuario) {
    if (usuario.carroId === null || this.usuarioService.usuario.id === usuario.id) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   *Verifica que el usuario pueda eliminar a otros usuarios del grupo
 */
  eliminarEnabled(usuario: Usuario) {
    if (this.administrador) {
      if (usuario.id === this.grupoService.grupo.administradorId) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      if (usuario.id === this.usuarioService.usuario.id) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  /**
   * Elimina al usuario del grupo
 */
  async eliminar(usuario: Usuario) {
    this.pertenecesService.getPerUsuariosGrupos(this.grupoService.grupo.id.toString(), usuario.id.toString()).subscribe(res => {
      this.pertenecesId = res;
    }, err => console.log(err));
    await this.sleep(1000);
    console.log(this.pertenecesId + " este es el perteneces id")
    this.pertenecesService.deletePerteneces(this.pertenecesId);
    await this.sleep(1000);
  }

  /**
   * Activa el modal para pedir transporte
 */
  async activarModal(usuario: Usuario) {
    this.usuarioModal = usuario;
    console.log(usuario);
    if (usuario.direccionId !== null) {
      this.direccionService.getDireccion(usuario.direccionId.toString());
      await this.sleep(1000);
    }
    this.carroService.getCarro(usuario.carroId.toString());
    await this.sleep(1000);
  }

  /**
   * Envia la solicitud de trasnporte
   * @param {NgForm} form Los datos de la solicitud a mandar
 */
  async onSubmit(form: NgForm) {
    console.log(true)
    this.invitacion.usuarioId = this.usuarioService.usuario.id;
    this.invitacion.grupoId = this.grupoService.grupo.id;
    this.invitacion.tipo = "invitacion";
    this.invitacion.descripcion = form.value.descripcion;
    this.invitacion.usuarioExId = this.usuarioModal.id;
    this.invitacionService.createInvitacion(this.invitacion);
    await this.sleep(1000);
  }

/**
   * @ignore
 */
  async sleep(ms) {
    ms = ms;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
